'use client'
import Link from "next/link";
import Back from "../components/Back";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "consultation" });
      cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "week_view" });
    })();
  }, [])
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text p-3">
        <p> 
          Honest feedback is a great gift, especially if it's something you think I could improve on. You can give me feedback anonymously <a href="https://www.admonymous.co/rai">here</a>.
        </p>
        <br />
        <br />
        <p>
          Currently, I help run <a target="_blank" href="https://sentinel-team.org/">Sentinel</a>, an org that attempts to foresee global catastrophes and take high-leverage action during crises. Please <a href="/contact">reach out</a> if you want to learn more, be involved, or support in any way.
        </p>
        <br />
        <br />
        <p>
          I'm particularly concerned about{" "}
          <a
            target="_blank"
            href="https://www.amazon.com/dp/0316595640/"
          >
            existential risk from unaligned artificial intelligence
          </a>
          .
        </p>
        <br />
        <br />
        <p>
          Previously, I've worked as an AI engineer for Microsoft, an{" "}
          <a target="_blank" href="https://ethereum.org/gl/governance/">
            Eth Core Dev
          </a>
          , a Blockchain Protocols Engineer at{" "}
          <a
            target="_blank"
            href="https://consensys.io/ethereum-upgrade"
          >
            Consensys
          </a>
          , and Co-Founder/CTO of <a target="_blank" href="https://alongside.xyz/">Alongside</a> (now <a target="_blank" href="https://www.universal.xyz/">Universal</a>).
          <br />
        </p>
        {/* <p>
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
        </p> */}
        <br></br>
        <br></br>
        <p>
          I'm a <a target="_blank" href="https://en.wikipedia.org/wiki/Transhumanism">transhumanist</a> who enjoys <a target="_blank" href="https://www.relateful.com/">circling</a>, <a target="_blank" href="https://www.lesswrong.com/posts/yeADMcScw8EW9yxpH/a-sketch-of-good-communication">sharing beliefs productively</a>, betting on those beliefs, skillfully relating to the sensations in my body (especially through dance and breath), and endless self-improvement.
        </p>
        <br />
        <br />
        <p>
          If you're one of the few that read this far, you can{" "}
          <a data-cal-namespace="consultation" data-cal-link="raisur/consultation" data-cal-config='{"layout":"week_view"}'>book a call with me</a> for $1.
        </p>
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
