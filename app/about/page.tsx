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
          i'm a cofounder and the head of emergency response @ <a target="_blank" href="https://sentinel-team.org/">sentinel</a>, an org that attempts to foresee large-scale/existential catastrophes and deploy emergency response measures to avert disaster. please <a href="/contact">reach out</a> if you want to learn more, be involved, or support in any way.
        </p>
        <br />
        <br />
        <p>
          i'm particularly concerned about{" "}
          <a
            target="_blank"
            href="https://80000hours.org/problem-profiles/artificial-intelligence/"
          >
            existential risk from unaligned artificial intelligence
          </a>
          .
        </p>
        <br />
        <br />
        <p>
          i've been an{" "}
          <a target="_blank" href="https://arxiv.org/abs/1804.04031">
            ai engineer
          </a>{" "}
          @ microsoft, an{" "}
          <a target="_blank" href="https://ethereum.org/gl/governance/">
            ethereum core developer
          </a>
          , a blockchain protocol engineer @{" "}
          <a
            target="_blank"
            href="https://consensys.io/products#for-the-ecosystem"
          >
            consensys
          </a>
          , and cto @{" "}
          <a target="_blank" href="https://alongside.xyz/">
            alongside
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
          i'm a <a target="_blank" href="https://en.wikipedia.org/wiki/Transhumanism">transhumanist</a> who enjoys <a target="_blank" href="https://www.relateful.com/">circling</a>, <a target="_blank" href="https://www.lesswrong.com/posts/yeADMcScw8EW9yxpH/a-sketch-of-good-communication">sharing beliefs productively</a>,  betting on those beliefs, skillfully relating to the sensations in my body, and endless self-improvement.
        </p>
        <br />
        <br />
        <p>
          i follow <a target="_blank" href="http://sl4.org/crocker.html">crocker's rules</a>.
        </p>
        <br />
        <br />
        if you want some free advice on anything (personal or profesional), you can{" "}
        <a data-cal-namespace="consultation"
          data-cal-link="raisur/consultation"

          data-cal-config='{"layout":"week_view"}'
        >book a call with me</a>.
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
