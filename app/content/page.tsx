import Link from "next/link";
import React from "react";
import Back from "../components/Back";

export default function Content() {
  let items = [
    <a target="_blank" href="https://www.youtube.com/@realrealfigures" key="realfigures">real figures – a podcast where i explore people's problems with concepts from forecasting, estimation, and psychology</a>,
    <a
      target="_blank"
      href="https://www.lesswrong.com/posts/zysbfcBfBG67pxbaA/spirits-vs-terms-as-arbitration-norms"
      key="bets"
    >
      a cautionary tale about how to resolve friendly bets
    </a>,
    <a
      target="_blank"
      href="https://alongside.xyz/blog/crypto-indexes"
      key="index-tokens"
    >
      a primer on the tradeoffs between the technical architectures of index
      tokens
    </a>,
    <React.Fragment key="4444">
      <a
        target="_blank"
        href="https://twitter.com/0xRaino/status/1481657327283359749?s=20"
      >
        thread
      </a>{" "}
      about{" "}
      <a target="_blank" href="https://eips.ethereum.org/EIPS/eip-4444">
        eip-4444: bound historical data in execution clients
      </a>
    </React.Fragment>,
    <a
      target="_blank"
      href="https://giddy-daisy-03d.notion.site/You-Have-the-Wrong-Challenge-45e07366a9004b47a3229b4e249decd9?pvs=4"
      key="men"
    >
      a common trap many men fall into when faced with their feelings of
      romantic unworthiness
    </a>,
    <Back key="back"></Back>
  ];

  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <p>{item}</p>
            <br />
            {index !== items.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
