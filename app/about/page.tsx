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
      <div className="full normal-text">
        <p>
          i'm a cofounder of <a target="_blank" href="https://sentinel-team.org/">sentinel</a>, a project that forecasts global catastrophes and uses an emergency response team to try to bend the arc of history when the shape of the looming problem is clearest. please <a href="/contact">reach out</a> if you want to support or be involved.
        </p>
        <br />
        <br />
        <p>
          i'm particularly worried about{" "}
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
          i'm a transhumanist who likes <a target="_blank" href="https://www.relateful.com/">circling</a>, <a target="_blank" href="https://www.lesswrong.com/posts/yeADMcScw8EW9yxpH/a-sketch-of-good-communication">sharing beliefs productively</a>,  betting on those beliefs, skillfully relating to the sensations in my body, and endless self-improvement.
        </p>
        <br />
        <br />
        i'm pretty good at helping people through emotional and strategic problems. because they're fun, i do limited paid{" "}
        <a data-cal-namespace="consultation"
          data-cal-link="raisur/consultation"

          data-cal-config='{"layout":"week_view"}'
        >consultations</a> for a low rate ($69).
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
}
