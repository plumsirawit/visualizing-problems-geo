import { useEffect, useRef } from "react";
import styled from "styled-components";
import convexHull from "monotone-convex-hull-2d";

const RubberBandWrapper = styled.div`
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

export interface IRubberBandProps {
  points: [number, number][];
}
export const RubberBand = ({ points }: IRubberBandProps) => {
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
      const addedPoints = [
        ...points,
        [0, 0],
        points.reduce((pre, cur) => [Math.max(pre[0], cur[0]), 0], [0, 0]),
        points.reduce((pre, cur) => [0, Math.max(pre[1], cur[1])], [0, 0]),
      ];
      const hull = convexHull(addedPoints) as number[];
      functionPlot({
        // @ts-ignore
        target: ref.current,
        width,
        height,
        grid: true,
        disableZoom: true,
        xAxis: {
          label: "mathematics",
          domain: [-1, 101],
        },
        yAxis: {
          label: "science",
          domain: [-1, 101],
        },
        data: [
          {
            points: addedPoints,
            fnType: "points",
            graphType: "scatter",
          },
          {
            points: [
              ...hull.map((idx) => addedPoints[idx]),
              addedPoints[hull[0]],
            ],
            fnType: "points",
            graphType: "polyline",
          },
        ],
      });
    });
  }, [width, height, ref.current, points]);
  return <RubberBandWrapper ref={ref} />;
};
