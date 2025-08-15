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
          most important thing up front: i want your honest feedback on anything! it could be something you think i could improve on, a description of what the experience of interacting with me is like, or anything else. to give me feedback anonymously, click <a href="https://www.admonymous.co/rai">here</a>.
        </p>
        <br />
        <br />
        <p>
          currently, i help run <a target="_blank" href="https://sentinel-team.org/">sentinel</a>, an org that attempts to foresee large-scale/existential catastrophes and take high leverage actions during crises. please <a href="/contact">reach out</a> if you want to learn more, be involved, or support in any way.
        </p>
        <br />
        <br />
        <p>
          i'm particularly concerned about{" "}
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
          previously, i've worked as an ai engineer for microsoft, an{" "}
          <a target="_blank" href="https://ethereum.org/gl/governance/">
            ethereum core developer
          </a>
          , a blockchain protocol engineer at{" "}
          <a
            target="_blank"
            href="https://consensys.io/products#for-the-ecosystem"
          >
            consensys
          </a>
          , and cofounder/cto of{" "}
          <a target="_blank" href="https://blockworks.co/news/universal-raise-led-by-a16z">
            universal
          </a>
          .<br />
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
          i'm a <a target="_blank" href="https://en.wikipedia.org/wiki/Transhumanism">transhumanist</a> who enjoys <a target="_blank" href="https://www.relateful.com/">circling</a>, <a target="_blank" href="https://www.lesswrong.com/posts/yeADMcScw8EW9yxpH/a-sketch-of-good-communication">sharing beliefs productively</a>, betting on those beliefs, skillfully relating to the sensations in my body (especially through dance and breath), and endless self-improvement.
        </p>
        <br />
        <br />
        <p>
          if you want some advice on anything (personal or professional), you can{" "}
          <a data-cal-namespace="consultation" data-cal-link="raisur/consultation" data-cal-config='{"layout":"week_view"}'>book a call with me</a> for $1.
        </p>
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
