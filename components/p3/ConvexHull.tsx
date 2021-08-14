import { checkSpanningTree, lowerLeftHull } from "./util";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import convexHull from "monotone-convex-hull-2d";

const ScatterWrapper = styled.div`
  & .tick line {
    stroke: white;
  }
  & .domain {
    stroke: white;
  }
  & .origin {
    stroke: white;
  }
  margin: 20px;
  g circle {
    opacity: 1;
    r: 4px;
  }
  & text {
    fill: white;
  }
`;

export interface IConvexHullProps {
  nodeCount: number;
  edges: [number, number, number, number][];
}
export const ConvexHull = ({ nodeCount, edges }: IConvexHullProps) => {
  const points = [];
  for (let bit = 0; bit < 1 << edges.length; bit++) {
    const selected = new Set<number>();
    for (let i = 0; i < edges.length; i++) {
      if (bit & (1 << i)) {
        selected.add(i);
      }
    }
    const isValid = checkSpanningTree(nodeCount, edges, selected);
    const sumTime = edges.reduce(
      (pre, cur, idx) => pre + (selected.has(idx) ? cur[2] : 0),
      0
    );
    const sumMoney = edges.reduce(
      (pre, cur, idx) => pre + (selected.has(idx) ? cur[3] : 0),
      0
    );
    if (isValid) {
      points.push([sumTime, sumMoney]);
    }
  }
  let width = 720;
  let height = 720;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    import("function-plot").then((module) => {
      const functionPlot = module.default;
      ref.current.innerHTML = "";
      const hull = lowerLeftHull(points);
      functionPlot({
        // @ts-ignore
        target: ref.current,
        width,
        height,
        grid: true,
        disableZoom: true,
        xAxis: {
          label: "SumTime",
          domain: [
            Math.min(...points.map((x) => x[0])),
            Math.max(...points.map((x) => x[0])),
          ],
        },
        yAxis: {
          label: "SumMoney",
          domain: [
            Math.min(...points.map((x) => x[1])),
            Math.max(...points.map((x) => x[1])),
          ],
        },
        data: [
          {
            points,
            fnType: "points",
            graphType: "scatter",
          },
          {
            points: hull,
            fnType: "points",
            graphType: "polyline",
          },
        ],
      });
    });
  }, [width, height, ref.current, points]);
  return <ScatterWrapper ref={ref} />;
};
