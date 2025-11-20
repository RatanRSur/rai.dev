import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function generateRandomPointsNormalized(
  numberOfPoints: number
): [number, number][] {
  return Array.from({ length: numberOfPoints }, () => [
    Math.random(),
    Math.random(),
  ]);
}

const normalizedInitialPoints = generateRandomPointsNormalized(2 ** 5);
const radii = normalizedInitialPoints.map(() => Math.random() * 50 + 50);

export default function VoronoiDiagram({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const initMousePoint: [number, number] = [0, 0];
  const [mousePoint, setMousePoint] = useState(initMousePoint);
  const handleMouseMove = (event: any) => {
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
    }, 1000 / 60 /*FPS*/);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scaledInitialPoints = normalizedInitialPoints.map<[number, number]>(
      ([x, y], i) => [
        x * width + Math.sin(tick / 800 + i) * radii[i],
        y * height + Math.cos(tick / 800 + i) * radii[i],
      ]
    );
    const points = [...scaledInitialPoints, mousePoint];
    const svg = d3
      .select("svg#voronoi")
      .attr("width", width)
      .attr("height", height);

    const voronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height]);

    // Create a linear gradient definition
    // Remove existing gradient definition if it exists
    svg.select("defs").remove();

    // Create a new gradient definition
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", width).attr("y2", 0);

    gradient.append("stop").attr("offset", "10%").attr("stop-color", "black");;
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#A9A9A9");
    gradient.append("stop").attr("offset", "90%").attr("stop-color", "black");;

    svg
      .selectAll("path")
      .data(voronoi.cellPolygons())
      .join("path")
      .attr("d", d3.line())
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 0.85);
  }, [mousePoint, tick]);

  return <svg id="voronoi"></svg>;
}
