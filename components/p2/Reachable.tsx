import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Code, Description } from "../commons";
import TeX from "@matejmazur/react-katex";
import reachableVectors from "./reachable-vectors";

const ReachableWrapper = styled.div`
  & .tick line {
    stroke: white;
  }
  & .domain {
    stroke: white;
  }
  & .origin {
    stroke: white;
  }
  margin: 0px;
  g circle {
    opacity: 1;
    r: 4px;
  }
  & text {
    fill: white;
  }
  & .line {
    stroke-width: 2px;
  }
  & .line-36,
  .line-37,
  .line-38,
  .line-39,
  .line-40,
  .line-41 {
    stroke-width: 3px;
  }
`;

export const Reachable = () => {
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
      functionPlot({
        // @ts-ignore
        target: ref.current,
        width,
        height,
        grid: true,
        disableZoom: true,
        xAxis: {
          label: "B",
          domain: [-0.5, 5.5],
        },
        yAxis: {
          label: "N",
          domain: [-0.5, 5.5],
        },
        data: [
          ...reachableVectors,
          {
            vector: [1, 1],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            vector: [0, 1],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            vector: [1, 0],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            vector: [0, -1],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            vector: [-1, 0],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            vector: [-1, -1],
            offset: [3, 2],
            graphType: "polyline",
            fnType: "vector",
            color: "#05b378",
          },
          {
            points: [[3, 2]],
            fnType: "points",
            graphType: "scatter",
            color: "#4682b4",
          },
          {
            points: [
              [3, 3],
              [3, 1],
              [2, 2],
              [4, 2],
              [4, 3],
              [2, 1],
            ],
            fnType: "points",
            graphType: "scatter",
            color: "#ffff00",
          },
          {
            points: [
              [3, 4],
              [4, 4],
              [5, 4],
              [2, 3],
              [5, 3],
              [1, 2],
              [5, 2],
              [1, 1],
              [4, 1],
              [1, 0],
              [2, 0],
              [3, 0],
            ],
            fnType: "points",
            graphType: "scatter",
            color: "#ff0000",
          },
        ],
      });
    });
  }, [width, height, ref.current]);
  return (
    <>
      <Description>
        <p>
          Example: <Code>BNNBB</Code> which is <TeX>(3, 2)</TeX>
        </p>
        <p>What if we use multiple operations?</p>
      </Description>
      <ReachableWrapper ref={ref} />
    </>
  );
};
