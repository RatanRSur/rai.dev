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
  return (
    <html className="h-full" ang="en">
      <head>
        <title>rai – entrepreneur earning to give</title>
      </head>
      <body className={`${inter.className} h-full`}>
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
