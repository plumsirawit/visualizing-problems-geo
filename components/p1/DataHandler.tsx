import { useState } from "react";
import styled from "styled-components";
import { Input } from "../commons";

const DataTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem;
  margin-top: 2.5rem;

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
`;

export interface IDataHandlerProps {
  points: [number, number][];
  setPoints: (points: [number, number][]) => void;
}
export const DataHandler = ({ points, setPoints }: IDataHandlerProps) => {
  const [newX, setNewX] = useState<string>("");
  const [newY, setNewY] = useState<string>("");
  const handleAdd = () => {
    const currentX = Number(newX);
    const currentY = Number(newY);
    if (
      isNaN(currentX) ||
      !Number.isSafeInteger(currentX) ||
      currentX < 0 ||
      currentX > 100
    ) {
      alert("The value of x is invalid (must be integer between 0 and 100)");
      return;
    }
    if (
      isNaN(currentY) ||
      !Number.isSafeInteger(currentY) ||
      currentY < 0 ||
      currentY > 100
    ) {
      alert("The value of y is invalid (must be integer between 0 and 100)");
      return;
    }
    setPoints([...points, [currentX, currentY]]);
  };
  const handleDelete = (idx: number) => {
    setPoints([...points.slice(undefined, idx), ...points.slice(idx + 1)]);
  };
  return (
    <DataTable>
      <tbody>
        {points.map((point, idx) => (
          <tr key={idx}>
            <td>[{idx + 1}]</td>
            <td colSpan={2}>
              ({point[0]}, {point[1]})
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
            )
          </td>
          <td className="buttoncell" onClick={handleAdd}>
            Add
          </td>
        </tr>
      </tbody>
    </DataTable>
  );
};
