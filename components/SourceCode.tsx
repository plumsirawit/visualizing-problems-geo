import { PropsWithChildren } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";

const SourceCodeWrapper = styled.div`
  margin-top: 20px;
  & pre {
    border-radius: 10px;
  }
`;
export const SourceCode = (props: PropsWithChildren<{}>) => {
  return (
    <SourceCodeWrapper>
      <SyntaxHighlighter language="cpp" style={monokaiSublime}>
        {props.children}
      </SyntaxHighlighter>
    </SourceCodeWrapper>
  );
};
