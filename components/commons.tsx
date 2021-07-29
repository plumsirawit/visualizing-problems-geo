import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    margin-left: 0.5rem;
  }

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  max-width: 90vmin;
  word-wrap: normal;
  ${(props) => props.color && `color: ${props.color};`}

  & a {
    color: #0070f3;
    text-decoration: none;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`;

export const Description = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
  max-width: 70vmin;
  margin-top: 1em;
  margin-bottom: 1em;
  & p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Code = styled.code`
  background-color: #292f35;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.3rem;
  font-family: "Roboto Mono", monospace;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #383f46;
  }
`;

export const Em = styled.em`
  color: #15ff79;
`;
