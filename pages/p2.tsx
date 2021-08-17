import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Container,
  Description,
  Title,
  ResourceLink,
  Code,
} from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";
import { ShowSolution } from "../components/ShowSolution";
import { Operations } from "../components/p2/Operations";
import TeX from "@matejmazur/react-katex";
import { Reachable } from "../components/p2/Reachable";
import { DataHandler } from "../components/p2/DataHandler";
import { Solution } from "../components/p2/Solution";
import solutionCode from "../components/p2/code.cpp";
import { SourceCode } from "../components/SourceCode";

export default function P2() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [strings, setStrings] = useState<string[]>([
    "N",
    "BBBBBB",
    "BNNNBBNBB",
    "NNNNBNBNNBNNNBBN",
    "NBNBN",
    "NNNNNN",
    "BNBNBNBBBBNNNNBBBBNNBBNBNBBNBBBBBBBB",
    "NNNNBN",
    "NBBBBBBBB",
    "NNNNNN",
  ]);
  return (
    <Container>
      <Navbar />
      <Head>
        <title>
          Visualizing Problems from a Geometrical Point of View | P2
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel>
        <Title>P2</Title>
        <Description>Boboniu and String</Description>
      </Panel>
      <Panel backgroundColor="#383f46">
        <Title>Problem Statement</Title>
        <Description>
          <ResourceLink url="https://codeforces.com/problemset/problem/1395/F" />
        </Description>
      </Panel>
      {showSolution || (
        <Panel>
          <Title>Let's think about it first...</Title>
          <ShowSolution onClick={() => setShowSolution(true)}>
            I'm done thinking, show me the solution
          </ShowSolution>
        </Panel>
      )}
      {showSolution && (
        <>
          <Panel>
            <Title color="#15ff79">First Observation</Title>
            <Description>
              <p>
                Two strings with the same characters count of both B and N are
                similar. For example, <Code>BNNBB</Code> and <Code>BNBNB</Code>{" "}
                are similar.
              </p>
              <p>
                Therefore, we can ignore the string, and instead, count the
                number of <Code>B</Code> and <Code>N</Code> in the string.
              </p>
              <p>
                That is, we introduce a function{" "}
                <TeX>
                  {
                    "\\phi \\colon \\{B, N\\}^* \\xrightarrow[onto]{} \\mathbb{N} \\times \\mathbb{N}"
                  }
                </TeX>
                where <TeX>{"\\{B, N\\}^*"}</TeX> denotes the set of all
                BN-strings and <TeX>{"\\mathbb{N}"}</TeX> denotes the set of all
                natural numbers including zero. This function counts the number
                of B and N in the input string and returns an ordered pair of B
                count and N count.
              </p>
              <p>
                For example,
                <ul>
                  <li>
                    <TeX>{"\\phi(BNNBB) = (3, 2)"}</TeX>
                  </li>
                  <li>
                    <TeX>{"\\phi(BBBB) = (4, 0)"}</TeX>
                  </li>
                  <li>
                    <TeX>{"\\phi(NN) = (0, 2)"}</TeX>
                  </li>
                  <li>
                    <TeX>{"\\phi() = (0, 0)"}</TeX>
                  </li>
                </ul>
              </p>
            </Description>
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Operations on a point</Title>
            <Operations />
          </Panel>
          <Panel>
            <Title color="#15ff79">Reachable points for a fixed distance</Title>
            <Reachable />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Example Data</Title>
            <DataHandler strings={strings} setStrings={setStrings} />
          </Panel>
          <Panel>
            <Title color="#15ff79">Solution to the data</Title>
            <Solution strings={strings} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Next Steps</Title>
            <Description>
              <p>
                If there exists a feasible hexagon of size <TeX>d</TeX>, then
                there always exists another feasible hexagon of size{" "}
                <TeX>d+1</TeX>
              </p>
              <p>
                We can use a technique called "Binary Search" to solve this kind
                of problem with efficiency. Now, the problem is to check whether
                for a given <TeX>d</TeX>, there exists a feasible hexagon or
                not. Then we can binary search through <TeX>d</TeX>.
              </p>
            </Description>
          </Panel>
          <Panel>
            <Title color="#15ff79">
              Is there a feasible hexagon of size <TeX>d</TeX>?
            </Title>
            <Description>
              <p>
                For each point <TeX>(x_i, y_i)</TeX>, the necessary and
                sufficient condition of <TeX>(x_t, y_t)</TeX> to be the center
                of a hexagon containing point <TeX>(x_i, y_i)</TeX> is the
                following system of six inequalities bouding the hexagon:
                <ul>
                  <li>
                    <TeX>x_t - d \leq x_i \leq x_t + d</TeX>
                  </li>
                  <li>
                    <TeX>y_t - d \leq y_i \leq y_t + d</TeX>
                  </li>
                  <li>
                    <TeX>y_t - x_t - d \leq y_i - x_i \leq y_t - x_t + d</TeX>
                  </li>
                </ul>
                which, by a few algebraic manipulations, gives:
                <ul>
                  <li>
                    <TeX>x_i - d \leq x_t \leq x_i + d</TeX>
                  </li>
                  <li>
                    <TeX>y_i - d \leq y_t \leq y_i + d</TeX>
                  </li>
                  <li>
                    <TeX>y_i - x_i - d \leq y_t - x_t \leq y_i - x_i + d</TeX>
                  </li>
                </ul>
                that is
                <ul>
                  <li>
                    <TeX>x_t \in [x_i - d, x_i + d]</TeX>
                  </li>
                  <li>
                    <TeX>y_t \in [y_i - d, y_i + d]</TeX>
                  </li>
                  <li>
                    <TeX>y_t - x_t \in [y_i - x_i - d, y_i - x_i + d]</TeX>
                  </li>
                </ul>
                so we may define
                <ul>
                  <li>
                    <TeX>A_i = [x_i - d, x_i + d]</TeX>
                  </li>
                  <li>
                    <TeX>B_i = [y_i - d, y_i + d]</TeX>
                  </li>
                  <li>
                    <TeX>C_i = [y_i - x_i - d, y_i - x_i + d]</TeX>
                  </li>
                </ul>
                as sets of possible values of <TeX>(x_t, y_t)</TeX> for each
                point <TeX>(x_i, y_i)</TeX>
              </p>
              <p>
                It turns out we can go through each point <TeX>(x_i, y_i)</TeX>{" "}
                and try to track the sets <TeX>A_i, B_i</TeX> and <TeX>C_i</TeX>
                . Then, intersect all these sets of feasible hexagon centers,
                for each input point, that is, find{" "}
                <ul>
                  <li>
                    <TeX>{"A = \\bigcap\\limits_{i=1}^{N}{A_i}"}</TeX>
                  </li>
                  <li>
                    <TeX>{"B = \\bigcap\\limits_{i=1}^{N}{B_i}"}</TeX>
                  </li>
                  <li>
                    <TeX>{"C = \\bigcap\\limits_{i=1}^{N}{C_i}"}</TeX>
                  </li>
                </ul>
                The satisfiable hexagon centers <TeX>(x_t, y_t)</TeX> will be
                the ones such that <TeX>x_t \in A, y_t \in B</TeX> and{" "}
                <TeX>y_t - x_t \in C</TeX>
              </p>
            </Description>
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">My solution in C++</Title>
            <SourceCode>{solutionCode}</SourceCode>
          </Panel>
          <Panel>
            <Title color="#15ff79">Official Editorial</Title>
            <Description>
              <ResourceLink url="https://codeforces.com/blog/entry/81355" />
            </Description>
          </Panel>
        </>
      )}
    </Container>
  );
}
