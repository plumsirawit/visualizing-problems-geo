import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Container, Description, Title, Em } from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";

export default function Intro() {
  return (
    <Container>
      <Navbar />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel>
        <Title>Introduction</Title>
        <Description>
          From just a change of perspectives, most of the problems could be
          viewed in a whole new way.
        </Description>

        <Title>What are we going to do?</Title>
        <Description>
          Here, I'll guide through a series of competitive programming problems.
          And we will try to solve each problem one by one.
        </Description>
      </Panel>
    </Container>
  );
}
