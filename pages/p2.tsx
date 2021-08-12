import Head from "next/head";
import { useState } from "react";
import {
  Container,
  Description,
  Title,
  ResourceLink,
} from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";
import { ShowSolution } from "../components/ShowSolution";

export default function P2() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  return (
    <Container>
      <Navbar />
      <Head>
        <title>Create Next App</title>
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
            {/* Description */}
          </Panel>
          <Panel>
            <Title color="#15ff79">Operations on a point</Title>
            {/* 2D Board Component */}
          </Panel>
          <Panel>
            <Title color="#15ff79">Reachable points for a fixed distance</Title>
            {/* 2D Board Component */}
          </Panel>
          <Panel>
            <Title color="#15ff79">Next Steps</Title>
            {/* Description */}
          </Panel>
          <Panel>
            <Title color="#15ff79">My solution in C++</Title>
            {/* C++ code */}
          </Panel>
          <Panel>
            <Title color="#15ff79">Official Editorial</Title>
            {/* Editorial Link */}
          </Panel>
        </>
      )}
    </Container>
  );
}
