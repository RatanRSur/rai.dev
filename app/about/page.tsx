import Link from "next/link";

export default function About() {
  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          i'm a former{" "}
          <Link href="https://arxiv.org/abs/1804.04031">
            machine learning engineer
          </Link>
          ,{" "}
          <Link href="https://github.com/hyperledger/besu">
            ethereum core developer
          </Link>
          , and cofounder of{" "}
          <Link href="https://alongside.xyz/">alongside</Link>.<br></br>
          so far i've tried to have an impact by{" "}
          <Link href="https://80000hours.org/articles/earning-to-give/#what-is-earning-to-give">
            earning to give
          </Link>{" "}
          (and I may continue to) but these days i'm seeing if i can have a more
          direct impact on{" "}
          <Link href="https://80000hours.org/problem-profiles/artificial-intelligence/">
            existential risk from unaligned artificial intelligence
          </Link>
          .
        </p>
        <br></br>
        <p>
          i'm also a transhumanist who likes dancing, meditation,
          entrepreneurship, solving my friend's problems, connection games,
          betting/prediction markets, and rationalist self-improvement.
        </p>
        <br></br>
        <p>
          <Link href="..">«</Link>
        </p>
      </div>
    </div>
  );
}
