import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Container, Description, Title, Em, Code } from "../components/commons";
import { Panel } from "../components/Panel";

const MainTable = styled.table`
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
  }
  & td + td {
    cursor: pointer;
    border-radius: 10px;
    transition: border-color 0.5s ease, background-color 0.5s ease;
    text-align: left;
    min-width: 40vmin;
  }
  & td + td:hover {
    background-color: #12141a;
  }
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel decorate>
        <Title>
          Visualizing Problems from a <Em>Geometrical</Em> Point of View
        </Title>

        <Description>
          A talk by{" "}
          <a href="https://github.com/plumsirawit">
            <Code>plumsirawit</Code>
          </a>
        </Description>
      </Panel>

      <Panel backgroundColor="#383f46">
        <Title>Contents</Title>
        <MainTable>
          <tbody>
            <tr>
              <td></td>
              <Link href="/intro">
                <td>Introduction</td>
              </Link>
            </tr>
            <tr>
              <td>P1</td>
              <Link href="/p1">
                <td>Winning Criteria</td>
              </Link>
            </tr>
            <tr>
              <td>P2</td>
              <Link href="/p2">
                <td>Boboniu and String</td>
              </Link>
            </tr>
            <tr>
              <td>P3</td>
              <Link href="/p3">
                <td>Grid Marble</td>
              </Link>
            </tr>
          </tbody>
        </MainTable>
      </Panel>
    </Container>
  );
}
