import BettingState from "../components/BettingState";
import Back from "../components/Back";

export default function Bet() {
  return (
    <div className="centered-window">
      <div>
        <BettingState />
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
