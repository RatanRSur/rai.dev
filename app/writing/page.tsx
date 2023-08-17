import Link from "next/link";

export default function Contact() {
  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          <Link
            target="_blank"
            href="https://www.lesswrong.com/posts/zysbfcBfBG67pxbaA/spirits-vs-terms-as-arbitration-norms"
          >
            a cautionary tale about how to resolve friendly bets
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            href="https://twitter.com/0xRaino/status/1481657360108204033"
          >
            thread
          </Link>{" "}
          about{" "}
          <Link href="https://eips.ethereum.org/EIPS/eip-4444">
            EIP-4444: Bound Historical Data in Execution Clients
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            href="https://giddy-daisy-03d.notion.site/You-Have-the-Wrong-Challenge-45e07366a9004b47a3229b4e249decd9?pvs=4"
          >
            a common trap many men fall into when faced with their feelings of
            unworthiness
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            href="https://alongside.xyz/blog/crypto-indexes"
          >
            a primer on the tradeoffs between the technical architectures of
            index tokens
          </Link>
        </p>
        <br></br>
        <p>
          <a href="..">«</a>
        </p>
      </div>
    </div>
  );
}
