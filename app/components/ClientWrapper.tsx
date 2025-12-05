"use client";

import { useEffect, useState } from "react";
import VoronoiDiagram from "./Voronoi";
import GoogleAnalytics from "./GoogleAnalytics";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
}

export function VoronoiBackground() {
  const { width, height } = useWindowSize();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <VoronoiDiagram width={width} height={height} />
    </div>
  );
}

export function GoogleAnalyticsWrapper({ id }: { id?: string }) {
  if (!id) return null;
  return <GoogleAnalytics id={id} />;
}