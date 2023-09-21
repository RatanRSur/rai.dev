import React from "react";

export default function Contact() {
  let items = [
    ["x/twitter", "https://x.com/0xRaino"],
    ["farcaster", "https://warpcast.com/rai"],
    ["email", "mailto:rai@rai.dev?subject=interested in <topic/service>"],
  ];
  return (
    <div className="centered-window">
      <div className="normal-text">
        {items.map((item, index) => (
          <>
            <p key={index}>
              <a target="_blank" href={item[1]}>
                {item[0]}
              </a>
            </p>
            <br />
          </>
        ))}
        <br />
        <a href=".." key="back">
          ⮐
        </a>
      </div>
    </div>
  );
}
