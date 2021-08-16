import Head from "next/head";
import { useState } from "react";
import {
  Container,
  Description,
  Title,
  ResourceLink,
} from "../components/commons";
import { Navbar } from "../components/Navbar";
import { ConvexHull } from "../components/p3/ConvexHull";
import { DataHandler } from "../components/p3/DataHandler";
import { IndifferenceCurve } from "../components/p3/IndifferenceCurves";
import { Scatter } from "../components/p3/Scatter";
import { SpanningTrees } from "../components/p3/SpanningTrees";
import { Panel } from "../components/Panel";
import { ShowSolution } from "../components/ShowSolution";
import solutionCode from "../components/p3/code.cpp";
import { SourceCode } from "../components/SourceCode";
import { Animation } from "../components/p3/Animation";

export default function P3() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [nodeCount, setNodeCount] = useState<number>(5);
  const [edges, setEdges] = useState<[number, number, number, number][]>([
    [0, 1, 161, 79],
    [0, 2, 161, 15],
    [0, 3, 13, 153],
    [1, 4, 142, 183],
    [2, 4, 236, 80],
    [3, 4, 40, 241],
    [2, 1, 65, 92],
  ]);
  return (
    <Container>
      <Navbar />
      <Head>
        <title>
          Visualizing Problems from a Geometrical Point of View | P3
        </title>
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
            <Description>
              <p>
                Minimum Spanning Tree (MST) problem, but instead of minimizing
                one sum, minimize the product of two sums instead.
              </p>
              <p>
                How to solve the MST problem efficiently? Use Kruskal's
                Algorithm or Prim's Algorithm. (Not covered in this talk)
              </p>
              <p>Our goal now: reduce this problem to a simple MST problem.</p>
              <p>
                No idea? Let's pick some random spanning trees and observe their
                properties.
              </p>
            </Description>
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Example Data</Title>
            <DataHandler
              nodeCount={nodeCount}
              setNodeCount={setNodeCount}
              edges={edges}
              setEdges={setEdges}
            />
          </Panel>
          <Panel>
            <Title color="#15ff79">All possible spanning trees</Title>
            <SpanningTrees nodeCount={nodeCount} edges={edges} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">
              SumTime and SumMoney of each of the spanning trees
            </Title>
            <Scatter nodeCount={nodeCount} edges={edges} />
          </Panel>
          <Panel>
            <Title color="#15ff79">Hyperbolas according to the product</Title>
            <IndifferenceCurve nodeCount={nodeCount} edges={edges} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">
              Minimum hyperbola from multiple stright lines
            </Title>
            <ConvexHull nodeCount={nodeCount} edges={edges} />
          </Panel>
          <Panel>
            <Title color="#15ff79">The algorithm in action</Title>
            <Animation nodeCount={nodeCount} edges={edges} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">My solution in C++</Title>
            <SourceCode>{solutionCode}</SourceCode>
          </Panel>
          <Panel>
            <Title color="#15ff79">Official Editorial</Title>
            <Description>
              <ResourceLink url="http://www.boi2011.ro/resurse/tasks/timeismoney-sol.pdf" />
            </Description>
          </Panel>
        </>
      )}
    </Container>
  );
}
