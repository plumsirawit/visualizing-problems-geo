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
              <p>
                It turns out we can go through each point and try to track
                centers <TeX>(x_t, y_t)</TeX> of hexagons that are feasible
                (i.e. they cover all the points). Then, intersect all these sets
                of feasible hexagon centers, for each input point. The result
                will be a set of hexagon centers that are feasible for all
                points.
              </p>
            </Description>
          </Panel>
          <Panel>
            <Title color="#15ff79">My solution in C++</Title>
            <SourceCode>{solutionCode}</SourceCode>
          </Panel>
          <Panel backgroundColor="#181a20">
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
