import { useEffect, useRef } from "react";
import styled from "styled-components";

const VisualWrapper = styled.div`
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

export interface IVisualProps {
  points: [number, number][];
}
export const Visual = ({ points }: IVisualProps) => {
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
          label: "mathematics",
          domain: [0, 100],
        },
        yAxis: {
          label: "science",
          domain: [0, 100],
        },
        data: [
          {
            points,
            fnType: "points",
            graphType: "scatter",
          },
        ],
      });
    });
  }, [width, height, ref.current, points]);
  return <VisualWrapper ref={ref} />;
};
