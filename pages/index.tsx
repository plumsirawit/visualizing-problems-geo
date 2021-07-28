import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Container, Description, Title, Em } from "../components/commons";
import { Panel } from "../components/Panel";

const MainTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem;
  margin: 1rem;

  & tr {
    height: 4rem;
  }
  & td:hover {
    border-color: #15ff79;
  }
  & td {
    min-width: 4rem;
    font-size: 1.5rem;
    padding: 10px;
    text-align: center;
  }
  & td + td {
    cursor: pointer;
    background-color: #12141a;
    border-radius: 10px;
    border: 1px solid #12141a;
    transition: border-color 0.5s ease;
    text-align: left;
    min-width: 20vw;
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
          From just a change of perspectives, most of the problems could be
          viewed in a whole new way.
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
            <tr>
              <td>P4</td>
              <Link href="/p4">
                <td>Mixture</td>
              </Link>
            </tr>
            <tr>
              <td>P5</td>
              <Link href="/p5">
                <td>Time is Money</td>
              </Link>
            </tr>
          </tbody>
        </MainTable>
      </Panel>
    </Container>
  );
}
