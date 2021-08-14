import Head from "next/head";
import { useState } from "react";
import { Container, Description, Title } from "../components/commons";
import { DataHandler } from "../components/p1/DataHandler";
import { Navbar } from "../components/Navbar";
import { RubberBand } from "../components/p1/RubberBand";
import { Visual } from "../components/p1/Visual";
import { Weight } from "../components/p1/Weight";
import { Panel } from "../components/Panel";
import { ShowSolution } from "../components/ShowSolution";

export default function P1() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [points, setPoints] = useState<[number, number][]>([
    [50, 70],
    [80, 10],
    [100, 30],
  ]);
  const [A, setA] = useState<number>(1);
  const [B, setB] = useState<number>(1);
  return (
    <Container>
      <Navbar />
      <Head>
        <title>
          Visualizing Problems from a Geometrical Point of View | P1
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel>
        <Title>P1</Title>
        <Description>Winning Criteria</Description>
      </Panel>
      <Panel backgroundColor="#383f46">
        <Title>Problem Statement</Title>
        <Description>
          <p className="small">
            You're a teacher and you've hosted two exams for your class of N =
            100 students in total. The first exam is a mathematics exam and the
            second one is science. Each student will take both of the exams and
            get a score of between 0 and 100 (inclusive) each. At the end of the
            exams, you're ranking the students from the highest score to the
            lowest score, but you can assign nonnegative integer weights to the
            two subjects (i.e. 1 for math and 1 for science or 3 for math and 2
            for science). Each student's total score is the weighted sum of the
            two subjects. Can you assign the weights such that the first student
            got the first rank?
          </p>
          <p className="small">
            For example (in a smaller classroom), suppose there are only 3
            students. The first student got 50/100 in mathematics and 70/100 in
            science. The second student got 80/100 in mathematics and 10/100 in
            science. And the third student got 100/100 in mathematics and 30/100
            in science.
          </p>
          <p className="small">
            If the weights are 1 for mathematics and 1 for science, then the
            third student, who got a total of 130, ranked the top. However, if
            the weights are 1 for mathematics and 2 for science, then the first
            student, who got a total of 190, ranked the top. Therefore, it is
            possible to assign the weights such that the first student got the
            first rank.
          </p>
          <p className="small">
            In some scenarios, it will be impossible to assign the weights such
            that the first student got the first rank. Can you describe an
            algorithm or a thinking pattern to check whether it is possible or
            not to assign the weights such that the first student got the first
            rank?
          </p>
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
            <Title color="#15ff79">Example Data</Title>
            <DataHandler points={points} setPoints={setPoints} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Let's visualize in 2D</Title>
            <Visual points={points} />
          </Panel>
          <Panel>
            <Title color="#15ff79">Now let's assign the weight</Title>
            <Weight points={points} A={A} B={B} setA={setA} setB={setB} />
          </Panel>
          <Panel backgroundColor="#181a20">
            <Title color="#15ff79">Add the rubber band</Title>
            <RubberBand points={points} />
          </Panel>
        </>
      )}
    </Container>
  );
}
