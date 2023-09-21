import BettingState from "../components/BettingState";

export default function Bet() {
  return (
    <div className="centered-window">
      <div>
        <BettingState />
        <br />
        <br />
        <a href=".." key="back">
          ⮐
        </a>
      </div>
    </div>
  );
}
