import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  Container,
  Description,
  Title,
  Em,
  Code,
  Subtitle,
} from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";

export default function Conclusion() {
  return (
    <Container>
      <Navbar />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Panel backgroundColor="#383f46">
        <Title>Conclusion</Title>
        {/* <Description>
          From just a change of perspectives, most of the problems could be
          viewed in a whole new way. This is not easy. But it is not too hard
          either. Practice makes perfect.
        </Description> */}
      </Panel>
      <Panel decorate>
        <Title>The End</Title>
        <Subtitle>
          Visualizing Problems from a <Em>Geometrical</Em> Point of View
        </Subtitle>
        <Description>
          A talk by{" "}
          <a href="https://github.com/plumsirawit">
            <Code>plumsirawit</Code>
          </a>
        </Description>
      </Panel>
    </Container>
  );
}
