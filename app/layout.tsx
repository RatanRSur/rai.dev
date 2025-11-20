"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import localFont from "next/font/local";
import VoronoiDiagram from "./components/Voronoi";
import GoogleAnalytics from "./components/GoogleAnalytics";

const exposure = localFont({
  src: [
    {
      path: "./fonts/Exposure/ExposureTrial[-10].otf",
      style: "normal",
    },
    {
      path: "./fonts/Exposure/ExposureItalicTrial[-10].otf",
      style: "italic",
    },
  ],
  variable: "--font-exposure",
});

const jslBlackletter = localFont({
  src: [
    {
      path: "./fonts/jsl_blackletter/JBlack.ttf",
      style: "normal",
    },
  ],
  variable: "--font-jsl-blackletter",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, height } = useWindowSize();
  return (
    <html className="h-full" lang="en">
      <head>
        <title>rai sur</title>
      </head>
      <body className={`${exposure.className} ${jslBlackletter.variable} h-full`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <div className="absolute -z-10 h-full">
          <VoronoiDiagram width={width} height={height} />
        </div>
        {children}
      </body>
    </html>
  );
}
