import Link from "next/link";
import BettingState from "../components/BettingState";

export default function Bet() {
  return (
    <div className="centered-window">
      <div>
        <BettingState />
        <br />
        <br />
        <Link href=".." key="back">
          ⮐
        </Link>
      </div>
    </div>
  );
}
