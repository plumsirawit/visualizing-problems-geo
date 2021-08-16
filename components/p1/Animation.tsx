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
  A = 0,
  B = 100,
  C: number = undefined,
  next: (
    functionPlot: any,
    width: number,
    height: number,
    element: HTMLDivElement,
    points: [number, number][],
    A: number,
    B: number,
    final: () => void
  ) => void,
  final: () => void
) => {
  if (C === undefined) {
    C = A * 100 + B * 100;
  }
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
      B === 0
        ? { fn: `x - ${C / A}`, fnType: "implicit" as "implicit" }
        : { fn: `${-A / B} * x + ${C / B}` },
    ],
  });
  if (points.filter((point) => A * point[0] + B * point[1] >= C).length > 0) {
    if (A !== 0 && B === 0) {
      final();
      return;
    }
    setTimeout(
      () =>
        next(
          functionPlot,
          width,
          height,
          element,
          points,
          A + 10,
          B - 10,
          final
        ),
      100
    );
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
          next,
          final
        ),
      20
    );
  }
};

const animationLoop = (
  functionPlot: any,
  width: number,
  height: number,
  element: HTMLDivElement,
  points: [number, number][],
  A = 0,
  B = 100,
  final: () => void
) => {
  element.innerHTML = "";
  const point = points.sort(
    (a, b) => A * b[0] + B * b[1] - (A * a[0] + B * a[1])
  )[0];
  const C = A * point[0] + B * point[1];
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
      A === 0 && B === 0
        ? undefined
        : B === 0
        ? {
            fn: `x - ${C / A}`,
            fnType: "implicit" as "implicit",
          }
        : {
            fn: `${-A / B} * x + ${C / B}`,
          },
    ],
  });
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
        undefined,
        animationLoop,
        final
      ),
    500
  );
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
      innerAnimationLoop(
        module.default,
        width,
        height,
        ref.current,
        points,
        0,
        100,
        undefined,
        animationLoop,
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
