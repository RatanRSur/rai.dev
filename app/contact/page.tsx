import React from "react";
import Back from "../components/Back";
import Image from "next/image";

export default function Contact() {
  let items = [
    [
      <Image
        key="x-logo"
        src="/x-logo-white.png"
        alt="X"
        width={16}
        height={16}
        className="inline-block"
      />,
      "https://x.com/rai_sur11",
    ],
    // ["instagram", "https://instagram.com/anditsfunagain"],
    ["email", "mailto:rai@rai.dev?subject=interested in <topic/service>"],
  ];
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <p>
              <a target="_blank" href={item[1] as string}>
                {item[0]}
              </a>
            </p>
            <br />
          </React.Fragment>
        ))}
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
