import { useState } from "react";
import styled from "styled-components";
import { Input } from "../commons";
import { phi } from "./util";

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
  & input {
    width: 100%;
  }
`;

export interface IDataHandlerProps {
  strings: string[];
  setStrings: (strings: string[]) => void;
}
export const DataHandler = ({ strings, setStrings }: IDataHandlerProps) => {
  const [newString, setNewString] = useState<string>("");
  const handleAdd = () => {
    if (!/^[BN]*$/g.test(newString)) {
      alert("The value of new string is invalid (must be a BN-string)");
      return;
    }
    setStrings([...strings, newString]);
  };
  const handleDelete = (idx: number) => {
    setStrings([...strings.slice(undefined, idx), ...strings.slice(idx + 1)]);
  };
  return (
    <DataTable>
      <tbody>
        {strings.map((string, idx) => (
          <tr key={idx}>
            <td>[{idx + 1}]</td>
            <td>{string}</td>
            <td>
              ({phi(string)[0]}, {phi(string)[1]})
            </td>
            <td className="buttoncell" onClick={() => handleDelete(idx)}>
              Del
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}>
            <Input
              type="text"
              value={newString}
              onChange={(e) => setNewString(e.target.value)}
            />
          </td>
          <td className="buttoncell" onClick={handleAdd}>
            Add
          </td>
        </tr>
      </tbody>
    </DataTable>
  );
};
