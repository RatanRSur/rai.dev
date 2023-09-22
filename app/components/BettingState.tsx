"use client";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const _ = require("lodash");

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

  let [nameA, setNameA] = useState(defaultOrSearchParam("nameA", "alice"));
  let [nameB, setNameB] = useState(defaultOrSearchParam("nameB", "bob"));
  let [event, setEvent] = useState(
    defaultOrSearchParam("event", "a spill in aisle 4")
  );
  let [pA, setPA] = useState(defaultNumberOrSearchParam("pA", 50));
  let [pB, setPB] = useState(defaultNumberOrSearchParam("pB", 60));
  let [maxBetA, setMaxBetA] = useState(
    defaultNumberOrSearchParam("maxBetA", 100)
  );
  let [maxBetB, setMaxBetB] = useState(
    defaultNumberOrSearchParam("maxBetB", 100)
  );

  const updateQueryParam = _.debounce(
    (key: string, value: React.ChangeEvent<HTMLInputElement>) => {
      const mutableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      mutableSearchParams.set(key, value.toString());
      router.replace(`${pathname}?${mutableSearchParams.toString()}`);
    },
    500
  );

  const handleTextChange =
    (key: string) =>
    (setText: (newVal: string) => void) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setText(value);
      updateQueryParam(key, value);
    };

  const handleNumberChange =
    (key: string) =>
    (setNumber: (newVal: number) => void) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setNumber(parseInt(value));
      updateQueryParam(key, value);
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
          value={nameA}
          onChange={handleTextChange("nameA")(setNameA)}
        ></CustomInput>{" "}
        thinks p({" "}
        <CustomInput
          type="text"
          value={event}
          onChange={handleTextChange("event")(setEvent)}
        ></CustomInput>
        ) ={" "}
        <CustomInput
          type="number"
          value={pA}
          onChange={handleNumberChange("pA")(setPA)}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetA}
          onChange={handleNumberChange("maxBetA")(setMaxBetA)}
        ></CustomInput>
        .
        <br />
        <CustomInput
          type="text"
          value={nameB}
          onChange={handleTextChange("nameB")(setNameB)}
        ></CustomInput>{" "}
        thinks p( {event} ) ={" "}
        <CustomInput
          type="number"
          value={pB}
          onChange={handleNumberChange("pB")(setPB)}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetB}
          onChange={handleNumberChange("maxBetB")(setMaxBetB)}
        ></CustomInput>
        .
      </p>
      <br />
      <br />
      <p>
        {nameA} bets $
        {maxTwoDecimals(calculateBets(pA, pB, maxBetA, maxBetB)[0])}
        .
        <br />
        {nameB} bets $
        {maxTwoDecimals(calculateBets(pA, pB, maxBetA, maxBetB)[1])}.
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
