import Head from "next/head";
import { Container, Description, Title, Code, Em } from "../components/commons";
import { Navbar } from "../components/Navbar";
import { Panel } from "../components/Panel";

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
          <a>Get started</a>
        </Description>
      </Panel>
    </Container>
  );
}
