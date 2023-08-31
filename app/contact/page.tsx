import React from "react";

export default function Contact() {
  let items = [
    <a target="_blank" href="https://x.com/0xRaino">
      x/twitter
    </a>,
    <a target="_blank" href="https://warpcast.com/rai">
      farcaster
    </a>,
    <a
      target="_blank"
      href="mailto:rai@rai.dev?subject=interested in <topic/service>"
    >
      email
    </a>,
    <a href="..">⮐</a>,
  ];
  return (
    <div className="centered-window">
      <div className="normal-text">
        {items.map((item, index) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
}
