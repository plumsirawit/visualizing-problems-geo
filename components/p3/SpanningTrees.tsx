import { Graph } from "../Graph";
import { checkSpanningTree } from "./util";
import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  max-width: 800px;
  margin: 40px;
  column-gap: 5px;
  row-gap: 5px;
  & > div {
    aspect-ratio: 1;
  }
`;
const GraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const GraphInfo = styled.div`
  position: absolute;
  bottom: 3px;
  left: 50%;
  aspect-ratio: auto;
  transform: translate(-50%, 0%);
`;

export interface ISpanningTreesProps {
  nodeCount: number;
  edges: [number, number, number, number][];
}
export const SpanningTrees = ({ nodeCount, edges }: ISpanningTreesProps) => {
  const graphs = [];
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
      graphs.push(
        <GraphWrapper key={bit}>
          <Graph
            nodeCount={nodeCount}
            edges={edges.map((edge, idx) => [
              ...edge,
              ...(selected.has(idx) ? ["#15ff79"] : []),
            ])}
          />
          <GraphInfo>
            {sumTime}, {sumMoney}
          </GraphInfo>
        </GraphWrapper>
      );
    }
  }
  return <GridWrapper>{graphs}</GridWrapper>;
};
