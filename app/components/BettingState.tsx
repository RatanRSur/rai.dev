"use client";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "d3";
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

  let [nameA, setNameA] = useState(defaultOrSearchParam("nameA", "Aalis"));
  let [nameB, setNameB] = useState(defaultOrSearchParam("nameB", "Baldwin"));
  let [event, setEvent] = useState(
    defaultOrSearchParam("event", "a successful siege")
  );
  let [pA, setPA] = useState(defaultNumberOrSearchParam("pA", 55));
  let [pB, setPB] = useState(defaultNumberOrSearchParam("pB", 65));
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

  function maxTwoDecimals(num: number): string {
    return format(".2~f")(num);
  }

  const [betA, betB, switched] = calculateBets(pA, pB, maxBetA, maxBetB);
  const invalid =
    [betA, betB].some((bet) => Number.isNaN(bet)) ||
    pA < 0 ||
    pA > 100 ||
    pB < 0 ||
    pB > 100;

  return (
    <div className="betting-state">
      <p>
        <CustomInput
          type="text"
          value={nameA}
          blackletter={true}
          onChange={handleTextChange("nameA")(setNameA)}
        ></CustomInput>{" "}
        thinks p({" "}
        <CustomInput
          type="text"
          value={event}
          onChange={handleTextChange("event")(setEvent)}
        ></CustomInput> ) ={" "}
        <CustomInput
          type="number"
          value={pA}
          blackletter={true}
          min={0}
          max={100}
          onChange={handleNumberChange("pA")(setPA)}
        ></CustomInput>
        % and will wager up to $
        <CustomInput
          type="number"
          value={maxBetA}
          blackletter={true}
          onChange={handleNumberChange("maxBetA")(setMaxBetA)}
        ></CustomInput>
        .
      </p>
      <br className="md:hidden" />
      <p>
        <CustomInput
          type="text"
          value={nameB}
          blackletter={true}
          onChange={handleTextChange("nameB")(setNameB)}
        ></CustomInput>{" "}
        thinks p( {event} ) ={" "}
        <CustomInput
          type="number"
          value={pB}
          blackletter={true}
          min={0}
          max={100}
          onChange={handleNumberChange("pB")(setPB)}
        ></CustomInput>
        % and will wager up to $
        <CustomInput
          type="number"
          value={maxBetB}
          blackletter={true}
          onChange={handleNumberChange("maxBetB")(setMaxBetB)}
        ></CustomInput>
        .
      </p>
      {!invalid && (
        <>
          <br />
          <p>
            {nameA} bets ${maxTwoDecimals(betA)} on {event}{switched ? " NOT happening" : ""}.
          </p>
          <p>
            {nameB} bets ${maxTwoDecimals(betB)} on {event}{switched ? "" : " NOT happening"}.
          </p>
          <br />
          <p>
            - <a
              target="_blank"
              href="https://web.archive.org/web/20190220163419/http://bywayofcontradiction.com/even-odds/"
            >
              <span style={{ fontStyle: "italic" }}>even odds</span>
            </a>{" "}
            (<a
              target="_blank"
              href="https://www.lesswrong.com/posts/aiz4FCKTgFBtKiWsE/even-odds#4kciXD7QMqWf5wSpG"
            >
              LW comments
            </a>){" "}
            by Scott Garrabrant
          </p>
        </>
      )}
    </div>
  );
}
