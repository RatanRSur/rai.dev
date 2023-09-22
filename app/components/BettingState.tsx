"use client";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type State = {
  a: string;
  b: string;
  event: string;
  pA: number;
  pB: number;
  maxBetA: number;
  maxBetB: number;
};

const dbg = (thing: any) => {
  console.log(thing);
  return thing;
};

export default function BettingState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultOrSearchParam = (key: string, defaultVal: string) => {
    const rawVal = searchParams.get(key);
    return rawVal == null ? defaultVal : rawVal;
  };
  const defaultNumberOrSearchParam = (key: string, defaultVal: number) => {
    const rawVal = searchParams.get(key);
    return rawVal == null ? defaultVal : parseInt(rawVal);
  };
  const a = defaultOrSearchParam("a", "alice");
  const b = defaultOrSearchParam("b", "bob");
  const event = defaultOrSearchParam("event", "a spill in aisle 4");
  const pA = defaultNumberOrSearchParam("pA", 50);
  const pB = defaultNumberOrSearchParam("pB", 60);
  const maxBetA = defaultNumberOrSearchParam("maxBetA", 100);
  const maxBetB = defaultNumberOrSearchParam("maxBetB", 110);

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = event.target.value;
      const mutableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      mutableSearchParams.set(key, newVal);
      router.replace(`${pathname}?${mutableSearchParams.toString()}`);
    };

  const calculateBets = (
    pA: number,
    pB: number,
    maxBetA: number,
    maxBetB: number
  ): [number, number] => {
    let fracA = pA / 100.0;
    let fracB = pB / 100.0;
    if (!(fracA + (1 - fracB) > 1)) {
      // we need the sum to be greater than 1
      fracA = 1 - fracA;
      fracB = 1 - fracB;
    }
    let maxBet = Math.min(maxBetA, maxBetB);
    let betA = maxBet * (fracA ** 2 - fracB ** 2);
    let betB = maxBet * ((1 - fracB) ** 2 - (1 - fracA) ** 2);
    return [betA, betB];
  };

  function maxTwoDecimals(num: number): string {
    if (Math.floor(num) === num) {
      return num.toString();
    }
    return num.toFixed(2);
  }

  return (
    <div className="betting-state">
      <p>
        <CustomInput
          type="text"
          value={a}
          onChange={handleChange("a")}
        ></CustomInput>{" "}
        thinks p({" "}
        <CustomInput
          type="text"
          value={event}
          onChange={handleChange("event")}
        ></CustomInput>
        ) ={" "}
        <CustomInput
          type="number"
          value={pA}
          onChange={handleChange("pA")}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetA}
          onChange={handleChange("maxBetA")}
        ></CustomInput>
        .
        <br />
        <CustomInput
          type="text"
          value={b}
          onChange={handleChange("b")}
        ></CustomInput>{" "}
        thinks p( {event} ) ={" "}
        <CustomInput
          type="number"
          value={pB}
          onChange={handleChange("pB")}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetB}
          onChange={handleChange("maxBetB")}
        ></CustomInput>
        .
      </p>
      <br />
      <br />
      <p>
        {a} bets ${maxTwoDecimals(calculateBets(pA, pB, maxBetA, maxBetB)[0])}
        .
        <br />
        {b} bets ${maxTwoDecimals(calculateBets(pA, pB, maxBetA, maxBetB)[1])}.
      </p>
      <br />
      <br />
      <p>
        from{" "}
        <a
          target="_blank"
          href="https://www.lesswrong.com/posts/aiz4FCKTgFBtKiWsE/even-odds"
        >
          <span style={{ fontStyle: "italic" }}>even odds</span>
        </a>{" "}
        by scott garrabrant
      </p>
    </div>
  );
}
