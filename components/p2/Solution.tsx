import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Code, Description } from "../commons";
import TeX from "@matejmazur/react-katex";
import { phi, solve } from "./util";

const SolutionWrapper = styled.div`
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

interface ISolutionProps {
  strings: string[];
}
export const Solution = ({ strings }: ISolutionProps) => {
  const points = strings.map(phi);
  let width = 720;
  let height = 720;
  const ref = useRef<HTMLDivElement>(null);
  const [xt, yt, d] = solve(strings);
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
          domain: [-0.5, Math.max(xt, yt) + d + 0.5],
        },
        yAxis: {
          label: "N",
          domain: [-0.5, Math.max(xt, yt) + d + 0.5],
        },
        data: [
          {
            points,
            fnType: "points",
            graphType: "scatter",
            color: "#4682b4",
          },
          {
            points: [
              [xt - d, yt - d],
              [xt - d, yt],
              [xt, yt + d],
              [xt + d, yt + d],
              [xt + d, yt],
              [xt, yt - d],
              [xt - d, yt - d],
            ],
            fnType: "points",
            graphType: "polyline",
          },
          {
            points: [[xt, yt]],
            fnType: "points",
            graphType: "scatter",
          },
        ],
      });
    });
  }, [width, height, ref.current, points]);
  return (
    <>
      <SolutionWrapper ref={ref} />
      <TeX>{`x_t = ${xt}, y_t = ${yt}, d = ${d}`}</TeX>
    </>
  );
};
