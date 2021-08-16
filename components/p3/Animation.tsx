import { checkSpanningTree, lowerLeftHull } from "./util";
import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

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

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AnimationButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.5s ease;
  font-family: "Roboto Mono", monospace;
  margin: 10px;
  outline: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `
  cursor: default;
  color: gray;
  `}
  ${(props) =>
    props.disabled
      ? `background-color: #181a20`
      : `
      background-color: #292f35;
  &:hover {
    background-color: #383f46;
  }
  `}
`;

const setupScene = (
  functionPlot: any,
  width: number,
  height: number,
  element: HTMLDivElement,
  points: [number, number][]
) => {
  element.innerHTML = "";
  functionPlot({
    // @ts-ignore
    target: element,
    width,
    height,
    grid: true,
    disableZoom: true,
    xAxis: {
      label: "SumTime",
      domain: [
        Math.min(...points.map((x) => x[0])) - 1,
        Math.max(...points.map((x) => x[0])) + 1,
      ],
    },
    yAxis: {
      label: "SumMoney",
      domain: [
        Math.min(...points.map((x) => x[1])) - 1,
        Math.max(...points.map((x) => x[1])) + 1,
      ],
    },
    data: [
      {
        points,
        fnType: "points",
        graphType: "scatter",
      },
    ],
  });
};

const innerAnimationLoop = (
  functionPlot: any,
  width: number,
  height: number,
  element: HTMLDivElement,
  points: [number, number][],
  A: number,
  B: number,
  C: number,
  oldLines: Record<string, unknown>[],
  final: (point: [number, number]) => void
) => {
  //element.innerHTML = "";
  functionPlot({
    // @ts-ignore
    target: element,
    width,
    height,
    grid: true,
    disableZoom: true,
    xAxis: {
      label: "SumTime",
      domain: [
        Math.min(...points.map((x) => x[0])) - 1,
        Math.max(...points.map((x) => x[0])) + 1,
      ],
    },
    yAxis: {
      label: "SumMoney",
      domain: [
        Math.min(...points.map((x) => x[1])) - 1,
        Math.max(...points.map((x) => x[1])) + 1,
      ],
    },
    data: [
      {
        points,
        fnType: "points",
        graphType: "scatter",
      },
      ...oldLines,
      B === 0
        ? { fn: `x - ${C / A}`, fnType: "implicit" as "implicit" }
        : { fn: `${-A / B} * x + ${C / B}` },
    ],
  });
  if (points.filter((point) => A * point[0] + B * point[1] <= C).length > 0) {
    oldLines.push(
      B === 0
        ? { fn: `x - ${C / A}`, fnType: "implicit" as "implicit" }
        : { fn: `${-A / B} * x + ${C / B}` }
    );
    final(points.filter((point) => A * point[0] + B * point[1] <= C)[0]);
  } else {
    requestAnimationFrame(() =>
      innerAnimationLoop(
        functionPlot,
        width,
        height,
        element,
        points,
        A,
        B,
        C + A + B,
        oldLines,
        final
      )
    );
  }
};

const createLineSweeper =
  (
    functionPlot: any,
    width: number,
    height: number,
    element: HTMLDivElement,
    points: [number, number][]
  ) =>
  (A: number, B: number, oldLines: Record<string, unknown>[]) => {
    return new Promise<[number, number]>((res) => {
      innerAnimationLoop(
        functionPlot,
        width,
        height,
        element,
        points,
        A,
        B,
        A * Math.min(...points.map((x) => x[0])) +
          B * Math.min(...points.map((x) => x[1])),
        oldLines,
        res
      );
    });
  };

const recurseAnimation = async (
  lineSweeper: (
    A: number,
    B: number,
    oldLines: Record<string, unknown>[]
  ) => Promise<[number, number]>,
  leftPoint: [number, number],
  rightPoint: [number, number],
  oldLines: Record<string, unknown>[]
) => {
  const A = leftPoint[1] - rightPoint[1];
  const B = rightPoint[0] - leftPoint[0];
  const midPoint = await lineSweeper(A, B, oldLines);
  if (A * midPoint[0] + B * midPoint[1] < A * leftPoint[0] + B * leftPoint[1]) {
    await recurseAnimation(lineSweeper, leftPoint, midPoint, oldLines);
    await recurseAnimation(lineSweeper, midPoint, rightPoint, oldLines);
  }
};

export interface IAnimationProps {
  nodeCount: number;
  edges: [number, number, number, number][];
}
export const Animation = ({ nodeCount, edges }: IAnimationProps) => {
  const points = useMemo(() => {
    const currentPoints = [];
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
        currentPoints.push([sumTime, sumMoney]);
      }
    }
    return currentPoints;
  }, [nodeCount, edges]);
  let width = 720;
  let height = 720;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    import("function-plot").then((module) => {
      const functionPlot = module.default;
      setupScene(functionPlot, width, height, ref.current, points);
    });
  }, [ref.current, points]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const startAnimation = () => {
    if (!ref.current) {
      return;
    }
    setButtonDisabled(true);
    import("function-plot").then(async (module) => {
      const lineSweeper = createLineSweeper(
        module.default,
        width,
        height,
        ref.current,
        points
      );
      setupScene(module.default, width, height, ref.current, points);
      const oldLines = [];
      const leftPoint = await lineSweeper(1, 0, oldLines);
      const rightPoint = await lineSweeper(0, 1, oldLines);
      await recurseAnimation(lineSweeper, leftPoint, rightPoint, oldLines);
      setButtonDisabled(false);
    });
  };
  return (
    <OuterWrapper>
      <ScatterWrapper ref={ref} />
      <AnimationButton onClick={startAnimation} disabled={buttonDisabled}>
        Start Animation
      </AnimationButton>
    </OuterWrapper>
  );
};
