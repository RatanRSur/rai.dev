"use client";
import { useState } from "react";
import CustomInput from "./CustomInput";

export default function BettingState() {
  let [nameA, setNameA] = useState("alice");
  let [nameB, setNameB] = useState("bob");
  let [event, setEvent] = useState("a spill in aisle 4");
  let [pA, setPA] = useState(50);
  let [pB, setPB] = useState(60);
  let [maxBetA, setMaxBetA] = useState(100);
  let [maxBetB, setMaxBetB] = useState(100);

  const handleTextChange =
    (setText: (newVal: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    };

  const handleNumberChange =
    (setNumber: (newVal: number) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNumber(parseInt(event.target.value));
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
          onChange={handleTextChange(setNameA)}
        ></CustomInput>{" "}
        thinks p(
        <CustomInput
          type="text"
          value={event}
          onChange={handleTextChange(setEvent)}
        ></CustomInput>{" "}
        ) ={" "}
        <CustomInput
          type="number"
          value={pA}
          onChange={handleNumberChange(setPA)}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetA}
          onChange={handleNumberChange(setMaxBetA)}
        ></CustomInput>
        .
        <br />
        <CustomInput
          type="text"
          value={nameB}
          onChange={handleTextChange(setNameB)}
        ></CustomInput>{" "}
        thinks p({event})={" "}
        <CustomInput
          type="number"
          value={pB}
          onChange={handleNumberChange(setPB)}
        ></CustomInput>
        % and is willing to bet $
        <CustomInput
          type="number"
          value={maxBetB}
          onChange={handleNumberChange(setMaxBetB)}
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
