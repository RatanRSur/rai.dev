import React from "react";
import Back from "../components/Back";

export default function Contact() {
  let items = [
    ["x/twitter", "https://x.com/0xRaino"],
    ["farcaster", "https://warpcast.com/rai"],
    ["email", "mailto:rai@rai.dev?subject=interested in <topic/service>"],
  ];
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text">
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
        <Back></Back>
      </div>
    </div>
  );
}
