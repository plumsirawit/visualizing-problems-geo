import styled from "styled-components";
import Link, { LinkProps } from "next/link";

const NavbarWrapper = styled.div`
  height: 8rem;
  width: 100%;
  padding: 0px 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  color: white;
  top: 0px;
  position: absolute;
  transition: top 1s ease;
  z-index: 5;
`;

const NavbarInner = styled.div``;
const NavbarItemInner = styled.a`
  background-color: #292f35;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #383f46;
  }
  font-family: "Roboto Mono", monospace;
  margin: 10px;
`;
const NavbarItem = (props: React.PropsWithChildren<LinkProps>) => (
  <Link href={props.href}>
    <NavbarItemInner href="#">{props.children}</NavbarItemInner>
  </Link>
);

export const Navbar = () => {
  return (
    <NavbarWrapper>
      Logo
      <NavbarInner>
        <NavbarItem href="/intro">Intro</NavbarItem>
        <NavbarItem href="/intro">P1</NavbarItem>
        <NavbarItem href="/intro">P2</NavbarItem>
        <NavbarItem href="/intro">P3</NavbarItem>
        <NavbarItem href="/intro">P4</NavbarItem>
        <NavbarItem href="/intro">P5</NavbarItem>
      </NavbarInner>
    </NavbarWrapper>
  );
};
