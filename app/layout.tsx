"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./page.css";

function generateRandomPointsNormalized(
  numberOfPoints: number
): [number, number][] {
  const points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    const x = Math.random();
    const y = Math.random();
    points.push([x, y]);
  }
  return points;
}

const normalizedInitialPoints = generateRandomPointsNormalized(2 ** 5);
const radii = normalizedInitialPoints.map(() => Math.random() * 50 + 50);

function useWindowSize(): { width: number; height: number } {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const VoronoiDiagram: React.FC = ({ width, height }) => {
  const [mousePoint, setMousePoint] = useState([0, 0]);
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePoint([clientX, clientY]);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scaledInitialPoints = normalizedInitialPoints.map(([x, y], i) => [
      x * width + Math.sin(tick / 200 + i) * radii[i],
      y * height + Math.cos(tick / 200 + i) * radii[i],
    ]);
    const points = [...scaledInitialPoints, mousePoint];
    const svg = d3
      .select("svg#voronoi")
      .attr("width", width)
      .attr("height", height);

    const voronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height]);

    svg
      .selectAll("path")
      .data(voronoi.cellPolygons())
      .join("path")
      .attr("d", d3.line())
      .attr("fill", "none")
      .attr("stroke", "#5f5f5f");
  }, [mousePoint, tick]);

  console.log("rendering");
  return <svg id="voronoi"></svg>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, height } = useWindowSize();
  return (
    <html lang="en">
      <head>
        <title>rai – web3 protocol design and engineering</title>
      </head>
      <body className={inter.className}>
        <VoronoiDiagram width={width} height={height} />
        {children}
      </body>
    </html>
  );
}
