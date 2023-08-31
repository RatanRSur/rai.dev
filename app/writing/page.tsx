import React from "react";

export default function Writing() {
  let items = [
    <a
      target="_blank"
      href="https://www.lesswrong.com/posts/zysbfcBfBG67pxbaA/spirits-vs-terms-as-arbitration-norms"
    >
      a cautionary tale about how to resolve friendly bets
    </a>,
    <a target="_blank" href="https://alongside.xyz/blog/crypto-indexes">
      a primer on the tradeoffs between the technical architectures of index
      tokens
    </a>,
    <>
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
    </>,
    <a
      target="_blank"
      href="https://giddy-daisy-03d.notion.site/You-Have-the-Wrong-Challenge-45e07366a9004b47a3229b4e249decd9?pvs=4"
    >
      a common trap many men fall into when faced with their feelings of
      romantic unworthiness
    </a>,
    <a href="..">⮐</a>,
  ];

  return (
    <div className="centered-window">
      <div className="normal-text">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <p>{item}</p>
            {index !== items.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
