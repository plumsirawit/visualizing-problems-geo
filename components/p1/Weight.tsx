import { useEffect, useRef } from "react";
import styled from "styled-components";
import TeX from "@matejmazur/react-katex";
import { Input } from "../commons";

const WeightWrapper = styled.div`
  & .tick line {
    stroke: white;
  }
  & .domain {
    stroke: white;
  }
  & .origin {
    stroke: white;
  }
  margin: 0px 20px 20px 20px;
  g circle {
    opacity: 1;
    r: 4px;
  }
  & text {
    fill: white;
  }
`;

const DataInputWrapper = styled.div`
  margin: 2.5rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    margin: 5px;
  }

  & > div > span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 5px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 2rem;
`;
export interface IWeightProps {
  points: [number, number][];
  A: number;
  B: number;
  setA: (A: number) => void;
  setB: (B: number) => void;
}
export const Weight = ({ points, A, B, setA, setB }: IWeightProps) => {
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
          ...points
            .map((point) => {
              const C = A * point[0] + B * point[1];
              if (A === 0 && B === 0) return undefined;
              if (B === 0) {
                return {
                  fn: `x - ${C / A}`,
                  fnType: "implicit" as "implicit",
                };
              }
              return {
                fn: `${-A / B} * x + ${C / B}`,
              };
            })
            .filter((x) => x),
        ],
      });
    });
  }, [width, height, ref.current, points, A, B]);
  return (
    <>
      <DataInputWrapper>
        <div>
          <TeX>A:</TeX>
          <Input
            type="number"
            min="0"
            max="100"
            value={A}
            onChange={(e) => setA(Number(e.target.value))}
          />
        </div>
        <div>
          <TeX>B:</TeX>
          <Input
            type="number"
            min="0"
            max="100"
            value={B}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </div>
      </DataInputWrapper>
      <TitleWrapper>
        <TeX>Ax + By = C</TeX>
      </TitleWrapper>
      <WeightWrapper ref={ref} />
    </>
  );
};
