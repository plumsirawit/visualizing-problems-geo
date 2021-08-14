import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Code, Description } from "../commons";
import TeX from "@matejmazur/react-katex";

const OperationsWrapper = styled.div`
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
    stroke-width: 3px;
  }
`;

export const Operations = () => {
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
        <p>
          If we remove a character <Code>N</Code>, then the result is{" "}
          <TeX>(3, 1)</TeX>
        </p>
        <p>
          If we remove a character <Code>B</Code>, then the result is{" "}
          <TeX>(2, 2)</TeX>
        </p>
        <p>
          If we remove a substring <Code>BN</Code> or <Code>NB</Code>, then the
          result is <TeX>(2, 1)</TeX>
        </p>
        <p>
          If we add a character <Code>N</Code>, then the result is{" "}
          <TeX>(3, 3)</TeX>
        </p>
        <p>
          If we add a character <Code>B</Code>, then the result is{" "}
          <TeX>(4, 2)</TeX>
        </p>
        <p>
          If we add a string <Code>BN</Code> or <Code>NB</Code>, then the result
          is <TeX>(4, 3)</TeX>
        </p>
      </Description>
      <OperationsWrapper ref={ref} />
    </>
  );
};
