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

export default function P3() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  return (
    <Container>
      <Navbar />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel>
        <Title>P3</Title>
        <Description>timeismoney</Description>
      </Panel>
      <Panel backgroundColor="#383f46">
        <Title>Problem Statement</Title>
        <Description>
          <ResourceLink url="http://www.boi2011.ro/resurse/tasks/timeismoney.pdf" />
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
            <Title color="#15ff79">First steps</Title>
            {/* Description */}
          </Panel>
          <Panel>
            <Title color="#15ff79">
              Now let's see the graphs between SumTime and SumMoney of each MSTs
            </Title>
            {/* 2D Board Component */}
          </Panel>
          <Panel>
            <Title color="#15ff79">Indifference Curves</Title>
            {/* 2D Board Component */}
          </Panel>
          <Panel>
            <Title color="#15ff79">
              Minimum hyperbola from multiple stright lines
            </Title>
            {/* 2D Board Component */}
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
