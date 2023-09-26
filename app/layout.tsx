"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import VoronoiDiagram from "./components/Voronoi";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

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
  console.log("ga", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
  return (
    <html lang="en">
      <head>
        <title>rai – web3 protocol design and engineering</title>
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <VoronoiDiagram width={width} height={height} />
        {children}
      </body>
    </html>
  );
}
