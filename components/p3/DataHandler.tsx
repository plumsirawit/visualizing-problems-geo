import { useState } from "react";
import styled from "styled-components";
import { Input } from "../commons";
import { Graph } from "../Graph";

const DataTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem;
  margin: auto;

  & tr {
    height: 4rem;
    font-family: "Roboto Mono", monospace;
  }
  & td {
    min-width: 4rem;
    font-size: 1.5rem;
    padding: 10px;
    text-align: center;
    height: 100%;
    position: relative;
  }
  & .buttoncell {
    cursor: pointer;
    border-radius: 10px;
    transition: border-color 0.5s ease, background-color 0.5s ease;
  }
  & .buttoncell:hover {
    background-color: #383f46;
  }
  & input {
    width: 2rem;
  }
`;
const DataGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 720px;
  padding: 20px;
`;

export interface IDataHandlerProps {
  nodeCount: number;
  setNodeCount: (nodeCount: number) => void;
  edges: [number, number, number, number][];
  setEdges: (edges: [number, number, number, number][]) => void;
}
export const DataHandler = ({
  nodeCount,
  setNodeCount,
  edges,
  setEdges,
}: IDataHandlerProps) => {
  const [newX, setNewX] = useState<string>("");
  const [newY, setNewY] = useState<string>("");
  const [newT, setNewT] = useState<string>("");
  const [newM, setNewM] = useState<string>("");
  const [newNodeCount, setNewNodeCount] = useState<number>(nodeCount);
  const handleAdd = () => {
    const currentX = Number(newX);
    const currentY = Number(newY);
    const currentT = Number(newT);
    const currentM = Number(newM);
    if (
      isNaN(currentX) ||
      !Number.isSafeInteger(currentX) ||
      currentX < 0 ||
      currentX >= nodeCount
    ) {
      alert(
        `The value of x is invalid (must be integer between 0 and ${
          nodeCount - 1
        })`
      );
      return;
    }
    if (
      isNaN(currentY) ||
      !Number.isSafeInteger(currentY) ||
      currentY < 0 ||
      currentY >= nodeCount
    ) {
      alert(
        `The value of y is invalid (must be integer between 0 and ${
          nodeCount - 1
        })`
      );
      return;
    }
    setEdges([...edges, [currentX, currentY, currentT, currentM]]);
  };
  const handleDelete = (idx: number) => {
    setEdges([...edges.slice(undefined, idx), ...edges.slice(idx + 1)]);
  };
  return (
    <DataGrid>
      <DataTable>
        <tbody>
          <tr>
            <td>N =</td>
            <td colSpan={4}>
              <Input
                type="number"
                value={newNodeCount}
                onChange={(e) => setNewNodeCount(Number(e.target.value))}
                style={{ width: "10rem" }}
              />
            </td>
            <td
              className="buttoncell"
              onClick={() => {
                if (newNodeCount > 5) {
                  alert("Node count is limited to 5!");
                  return;
                }
                setEdges(
                  edges.filter(
                    ([u, v, _1, _2]) => u < newNodeCount && v < newNodeCount
                  )
                );
                setNodeCount(newNodeCount);
              }}
            >
              Set
            </td>
          </tr>
          {edges.map((point, idx) => (
            <tr key={idx}>
              <td>[{idx + 1}]</td>
              <td colSpan={4}>
                ({point[0]}, {point[1]}, {point[2]}, {point[3]})
              </td>
              <td className="buttoncell" onClick={() => handleDelete(idx)}>
                Del
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              (
              <Input
                type="text"
                value={newX}
                onChange={(e) => setNewX(e.target.value)}
              />
              ,
            </td>
            <td>
              <Input
                type="text"
                value={newY}
                onChange={(e) => setNewY(e.target.value)}
              />
              ,
            </td>
            <td>
              <Input
                type="text"
                value={newT}
                onChange={(e) => setNewT(e.target.value)}
              />
              ,
            </td>
            <td>
              <Input
                type="text"
                value={newM}
                onChange={(e) => setNewM(e.target.value)}
              />
              )
            </td>
            <td className="buttoncell" onClick={handleAdd}>
              Add
            </td>
          </tr>
        </tbody>
      </DataTable>
      <Graph nodeCount={nodeCount} edges={edges} />
    </DataGrid>
  );
};
