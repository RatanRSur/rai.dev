import { describe, expect, test } from "bun:test";
import * as fc from "fast-check";
import { calculateBets } from "./evenOdds";

// The UI feeds calculateBets integer percentages (it parseInts every input and
// validates 0-100) and integer dollar maxima, so the core properties are
// asserted exactly on that domain. A final property checks the math still
// holds for arbitrary real-valued probabilities, with float tolerance.
const percentArb = fc.integer({ min: 0, max: 100 });
const maxBetArb = fc.integer({ min: 0, max: 1_000_000 });

// FP noise in the stakes is bounded by a few ulps of maxBet (~1e-15 relative);
// real mechanism violations are on the order of maxBet * 1e-2 or larger.
const tolerance = (scale: number) => 1e-9 * Math.max(1, scale);

// Payout structure implied by [betA, betB, switched]: one bet, two sides,
// winner takes the loser's stake. A is on "event happens" unless switched.
const profitAIfEventHappens = (betA: number, betB: number, switched: boolean) =>
  switched ? -betA : betB;
const profitAIfEventDoesNot = (betA: number, betB: number, switched: boolean) =>
  switched ? betB : -betA;

const expectedProfitA = (
  beliefPercent: number,
  [betA, betB, switched]: [number, number, boolean]
): number => {
  const t = beliefPercent / 100;
  return (
    t * profitAIfEventHappens(betA, betB, switched) +
    (1 - t) * profitAIfEventDoesNot(betA, betB, switched)
  );
};

// B holds the opposite side, so B's profit is the negation of A's in each outcome
const expectedProfitB = (
  beliefPercent: number,
  [betA, betB, switched]: [number, number, boolean]
): number => {
  const t = beliefPercent / 100;
  return (
    t * -profitAIfEventHappens(betA, betB, switched) +
    (1 - t) * -profitAIfEventDoesNot(betA, betB, switched)
  );
};

describe("calculateBets", () => {
  test("stakes are nonnegative and never exceed either player's maximum", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const [betA, betB] = calculateBets(pA, pB, mA, mB);
        expect(betA).toBeGreaterThanOrEqual(0);
        expect(betB).toBeGreaterThanOrEqual(0);
        expect(betA).toBeLessThanOrEqual(Math.min(mA, mB));
        expect(betB).toBeLessThanOrEqual(Math.min(mA, mB));
      }),
      { numRuns: 500 }
    );
  });

  test("the more bullish player bets on the event; agreement means zero stakes", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const [betA, betB, switched] = calculateBets(pA, pB, mA, mB);
        if (pA > pB) expect(switched).toBe(false);
        if (pA < pB) expect(switched).toBe(true);
        if (pA === pB) {
          expect(betA).toBe(0);
          expect(betB).toBe(0);
        }
      }),
      { numRuns: 500 }
    );
  });

  test("stakes match Garrabrant's closed form (p+q-1)(1+p-q), (p+q-1)(1+q-p)", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const [betA, betB] = calculateBets(pA, pB, mA, mB);
        const a = pA / 100;
        const b = pB / 100;
        const maxBet = Math.min(mA, mB);
        // factored independently of the implementation's branch-and-square route
        const bullish = maxBet * Math.abs(a - b) * (a + b);
        const bearish = maxBet * Math.abs(a - b) * (2 - a - b);
        const [expectedA, expectedB] = pA >= pB ? [bullish, bearish] : [bearish, bullish];
        expect(Math.abs(betA - expectedA)).toBeLessThanOrEqual(tolerance(maxBet));
        expect(Math.abs(betB - expectedB)).toBeLessThanOrEqual(tolerance(maxBet));
      }),
      { numRuns: 500 }
    );
  });

  test("even odds: both players expect the same gain, maxBet * ((pA-pB)/100)^2", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const bets = calculateBets(pA, pB, mA, mB);
        const maxBet = Math.min(mA, mB);
        const evA = expectedProfitA(pA, bets);
        const evB = expectedProfitB(pB, bets);
        const theoretical = maxBet * ((pA - pB) / 100) ** 2;
        expect(Math.abs(evA - evB)).toBeLessThanOrEqual(tolerance(maxBet));
        expect(Math.abs(evA - theoretical)).toBeLessThanOrEqual(tolerance(maxBet));
      }),
      { numRuns: 500 }
    );
  });

  test("truthful reporting maximizes A's expected profit (incentive compatibility)", () => {
    fc.assert(
      fc.property(
        percentArb, percentArb, percentArb, maxBetArb, maxBetArb,
        (trueBelief, report, pB, mA, mB) => {
          const evTruthful = expectedProfitA(trueBelief, calculateBets(trueBelief, pB, mA, mB));
          const evDeviating = expectedProfitA(trueBelief, calculateBets(report, pB, mA, mB));
          expect(evTruthful).toBeGreaterThanOrEqual(evDeviating - tolerance(Math.min(mA, mB)));
        }
      ),
      { numRuns: 500 }
    );
  });

  test("truthful reporting maximizes B's expected profit (incentive compatibility)", () => {
    fc.assert(
      fc.property(
        percentArb, percentArb, percentArb, maxBetArb, maxBetArb,
        (trueBelief, report, pA, mA, mB) => {
          const evTruthful = expectedProfitB(trueBelief, calculateBets(pA, trueBelief, mA, mB));
          const evDeviating = expectedProfitB(trueBelief, calculateBets(pA, report, mA, mB));
          expect(evTruthful).toBeGreaterThanOrEqual(evDeviating - tolerance(Math.min(mA, mB)));
        }
      ),
      { numRuns: 500 }
    );
  });

  test("swapping the players swaps the stakes and flips the sides", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const [betA, betB, switched] = calculateBets(pA, pB, mA, mB);
        const [betA2, betB2, switched2] = calculateBets(pB, pA, mB, mA);
        const tol = tolerance(Math.min(mA, mB));
        expect(Math.abs(betA - betB2)).toBeLessThanOrEqual(tol);
        expect(Math.abs(betB - betA2)).toBeLessThanOrEqual(tol);
        if (pA !== pB) expect(switched2).toBe(!switched);
      }),
      { numRuns: 500 }
    );
  });

  test("stakes scale linearly in the shared maximum bet", () => {
    fc.assert(
      fc.property(percentArb, percentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const [betA, betB] = calculateBets(pA, pB, mA, mB);
        const [unitA, unitB] = calculateBets(pA, pB, 1, 1);
        const maxBet = Math.min(mA, mB);
        expect(betA).toBe(maxBet * unitA);
        expect(betB).toBe(maxBet * unitB);
      }),
      { numRuns: 500 }
    );
  });

  test("mechanism holds for real-valued probabilities too, not just integers", () => {
    const realPercentArb = fc.double({ min: 0, max: 100, noNaN: true });
    fc.assert(
      fc.property(realPercentArb, realPercentArb, maxBetArb, maxBetArb, (pA, pB, mA, mB) => {
        const bets = calculateBets(pA, pB, mA, mB);
        const [betA, betB] = bets;
        const maxBet = Math.min(mA, mB);
        const tol = tolerance(maxBet);
        expect(betA).toBeGreaterThanOrEqual(-tol);
        expect(betB).toBeGreaterThanOrEqual(-tol);
        expect(betA).toBeLessThanOrEqual(maxBet + tol);
        expect(betB).toBeLessThanOrEqual(maxBet + tol);
        const evA = expectedProfitA(pA, bets);
        const evB = expectedProfitB(pB, bets);
        const theoretical = maxBet * ((pA - pB) / 100) ** 2;
        expect(Math.abs(evA - evB)).toBeLessThanOrEqual(tol);
        expect(Math.abs(evA - theoretical)).toBeLessThanOrEqual(tol);
      }),
      { numRuns: 500 }
    );
  });

  test("worked examples", () => {
    // symmetric disagreement around 50%: equal stakes of maxBet * (a-b)(a+b)
    const [betA, betB, switched] = calculateBets(60, 40, 100, 100);
    expect(betA).toBeCloseTo(20, 9);
    expect(betB).toBeCloseTo(20, 9);
    expect(switched).toBe(false);

    // total disagreement: both stake the full shared max
    expect(calculateBets(100, 0, 250, 100)).toEqual([100, 100, false]);
    expect(calculateBets(0, 100, 100, 250)).toEqual([100, 100, true]);

    // total agreement: no bet
    const [zeroA, zeroB] = calculateBets(55, 55, 100, 100);
    expect(zeroA).toBe(0);
    expect(zeroB).toBe(0);
  });
});
