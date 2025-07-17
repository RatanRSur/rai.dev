import { Suspense } from 'react'
import BettingState from "../components/BettingState";
import Back from "../components/Back";

export default function Bet() {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="font-mono p-3">
        <Suspense>
          <BettingState />
        </Suspense>
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
