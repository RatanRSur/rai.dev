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

    svg
      .selectAll("path")
      .data(voronoi.cellPolygons())
      .join("path")
      .attr("d", d3.line())
      .attr("fill", "none")
      .attr("stroke", "gray");
  }, [mousePoint, tick]);

  return <svg id="voronoi"></svg>;
}
