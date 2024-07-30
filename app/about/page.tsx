import Link from "next/link";
import Back from "../components/Back";

export default function About() {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text">
        <p>
          i've been an{" "}
          <a target="_blank" href="https://arxiv.org/abs/1804.04031">
            ai engineer
          </a>{" "}
          @ microsoft, an{" "}
          <a target="_blank" href="https://ethereum.org/gl/governance/">
            ethereum core developer
          </a>
          , a blockchain protocol engineer @{" "}
          <a
            target="_blank"
            href="https://consensys.io/products#for-the-ecosystem"
          >
            consensys
          </a>
          , and cto @{" "}
          <a target="_blank" href="https://alongside.xyz/">
            alongside
          </a>
          .<br />
        </p>
        <br />
        <br />
        <p>
          i'm{" "}
          <a
            target="_blank"
            href="https://80000hours.org/articles/earning-to-give/#what-is-earning-to-give"
          >
            earning to give
          </a>{" "}
          via entrepreneurship to reduce{" "}
          <a
            target="_blank"
            href="https://80000hours.org/problem-profiles/artificial-intelligence/"
          >
            existential risk from unaligned artificial intelligence
          </a>
          .
        </p>
        <br></br>
        <br></br>
        <p>
          i'm a transhumanist who likes circling / relating games, productive beleif-sharing, betting on those beliefs, being present in my body, and endless self-improvement.
        </p>
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
