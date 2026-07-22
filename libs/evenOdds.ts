// Scott Garrabrant's "Even Odds" betting mechanism:
// https://web.archive.org/web/20190220163419/http://bywayofcontradiction.com/even-odds/
//
// A reports pA% for the event, B reports pB%. Whoever is more bullish bets on
// the event, the other against it. Stakes are the Brier-score transfers
// (p + q - 1)(1 + p - q) and (p + q - 1)(1 + q - p), scaled by the shared max
// bet. The scale must not depend on the reported probabilities or truthful
// reporting stops being optimal — min(maxBetA, maxBetB) satisfies that.
//
// Returns [betA, betB, switched]: A stakes betA, B stakes betB, and
// switched=true means A ended up betting on the event NOT happening.
export const calculateBets = (
  pA: number,
  pB: number,
  maxBetA: number,
  maxBetB: number
): [number, number, boolean] => {
  const probabilityTruePerA = pA / 100.0;
  const probabilityTruePerB = pB / 100.0;
  // scott garrabrant's calculation uses p = P(true) for A and q = P(false) for B so let's convert
  let p = probabilityTruePerA;
  let q = 1 - probabilityTruePerB;
  let switched = false;
  if (!(p + q > 1)) {
    // we need the sum to be greater than 1
    p = 1 - p;
    q = 1 - q;
    switched = true;
  }
  let maxBet = Math.min(maxBetA, maxBetB);
  let betA = maxBet * (p ** 2 - (1 - q) ** 2);
  let betB = maxBet * (q ** 2 - (1 - p) ** 2);
  return [betA, betB, switched];
};
