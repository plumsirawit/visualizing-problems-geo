import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const AnimationWrapper = styled.div`
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
  final: () => void
) => {
  functionPlot({
    // @ts-ignore
    target: element,
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
      B === 0
        ? { fn: `x - ${C / A}`, fnType: "implicit" as "implicit" }
        : { fn: `${-A / B} * x + ${C / B}` },
      ...oldLines,
    ],
  });
  if (points.filter((point) => A * point[0] + B * point[1] >= C).length > 0) {
    final();
  } else {
    setTimeout(
      () =>
        innerAnimationLoop(
          functionPlot,
          width,
          height,
          element,
          points,
          A,
          B,
          C - 50,
          oldLines,
          final
        ),
      20
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
    return new Promise<void>((res) => {
      innerAnimationLoop(
        functionPlot,
        width,
        height,
        element,
        points,
        A,
        B,
        A * 100 + B * 100,
        oldLines,
        res
      );
    });
  };

const animationLoop = async (
  functionPlot: any,
  width: number,
  height: number,
  element: HTMLDivElement,
  points: [number, number][],
  A = 0,
  B = 100,
  lineSweeper: (
    A: number,
    B: number,
    oldLines: Record<string, unknown>[]
  ) => Promise<void>,
  final: () => void
) => {
  element.innerHTML = "";
  const oldLines = [];
  while (B >= 0) {
    await lineSweeper(A, B, oldLines);
    const point = points.sort(
      (a, b) => A * b[0] + B * b[1] - (A * a[0] + B * a[1])
    )[0];
    const C = A * point[0] + B * point[1];
    oldLines.push(
      B === 0
        ? {
            fn: `x - ${C / A}`,
            fnType: "implicit" as "implicit",
            color: "#15ff79",
          }
        : { fn: `${-A / B} * x + ${C / B}`, color: "#15ff79" }
    );
    A += 10;
    B -= 10;
  }
  functionPlot({
    // @ts-ignore
    target: element,
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
      ...oldLines,
    ],
  });
  final();
};

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
};

export interface IAnimationProps {
  points: [number, number][];
}
export const Animation = ({ points }: IAnimationProps) => {
  let width = 720;
  let height = 720;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    import("function-plot").then((module) =>
      setupScene(module.default, width, height, ref.current, points)
    );
  }, [width, height, ref.current, points]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const startAnimation = () => {
    if (!ref.current) {
      return;
    }
    setButtonDisabled(true);
    import("function-plot").then((module) =>
      animationLoop(
        module.default,
        width,
        height,
        ref.current,
        points,
        0,
        100,
        createLineSweeper(module.default, width, height, ref.current, points),
        () => setButtonDisabled(false)
      )
    );
  };
  return (
    <OuterWrapper>
      <AnimationWrapper ref={ref} />
      <AnimationButton onClick={startAnimation} disabled={buttonDisabled}>
        Start Animation
      </AnimationButton>
    </OuterWrapper>
  );
};
