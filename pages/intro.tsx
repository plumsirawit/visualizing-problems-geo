import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Container, Description, Title, Em } from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel>
        <Title>A short introductory problem P1</Title>
        <Description></Description>
      </Panel>
      <Panel>
        <Title>Introduction</Title>

        <Description>
          From just a change of perspectives, most of the problems could be
          viewed in a whole new way.
        </Description>

        <Title>Why </Title>
      </Panel>
    </Container>
  );
}
