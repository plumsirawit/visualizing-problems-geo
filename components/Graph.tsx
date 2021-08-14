import GraphVis from "react-graph-vis";
import styled from "styled-components";

const GraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #383f46;
  border-radius: 10px;
  display: flex;
  max-height: 720px;
  margin: auto;
`;

export const Graph = ({ nodeCount, edges, ...rest }) => (
  <GraphWrapper>
    <GraphVis
      graph={{
        nodes: Array(nodeCount)
          .fill(null)
          .map((_, idx) => ({ id: idx, label: `${idx}` })),
        edges: edges.map((arr) => ({
          from: arr[0],
          to: arr[1],
          label: `(${arr[2]}, ${arr[3]})`,
          ...(arr.length > 3 && { color: arr[4] }),
        })),
      }}
      options={{
        layout: {
          hierarchical: false,
        },
        height: "100%",
        width: "100%",
        edges: {
          font: {
            face: "Roboto Mono",
            strokeWidth: 0,
            color: "white",
          },
          arrows: {
            to: {
              enabled: false,
            },
          },
        },
        nodes: {
          font: {
            face: "Roboto Mono",
            align: "center",
          },
          shape: "box",
          heightConstraint: 20,
        },
      }}
    />
  </GraphWrapper>
);
