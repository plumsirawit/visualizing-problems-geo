import React from "react";
import styled from "styled-components";

export const ShowSolution = styled.button`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
  margin: 2rem;
  border-radius: 10px;
  padding: 10px;
  transition: border-color 0.5s ease, background-color 0.5s ease;
  border: 0px;
  background-color: #12141a;
  color: white;
  font-family: "Roboto Mono", monospace;
  background-color: #383f46;
  transition: color 0.5s ease;
  cursor: pointer;
  &:hover {
    color: #15ff79;
  }
`;
