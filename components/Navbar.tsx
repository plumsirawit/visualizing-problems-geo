import styled from "styled-components";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

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
  ${(props) => props.color && `color: ${props.color}`}
`;
const NavbarItem = (
  props: React.PropsWithChildren<LinkProps> & { color?: string }
) => (
  <Link href={props.href}>
    <NavbarItemInner href="#" color={props.color}>
      {props.children}
    </NavbarItemInner>
  </Link>
);

export const Navbar = () => {
  const router = useRouter();
  return (
    <NavbarWrapper>
      <NavbarItem href="/">Home</NavbarItem>
      <NavbarInner>
        <NavbarItem
          href="/intro"
          color={router.route === "/intro" ? "#15ff79" : undefined}
        >
          Intro
        </NavbarItem>
        <NavbarItem
          href="/p1"
          color={router.route === "/p1" ? "#15ff79" : undefined}
        >
          P1
        </NavbarItem>
        <NavbarItem
          href="/p2"
          color={router.route === "/p2" ? "#15ff79" : undefined}
        >
          P2
        </NavbarItem>
        <NavbarItem
          href="/p3"
          color={router.route === "/p3" ? "#15ff79" : undefined}
        >
          P3
        </NavbarItem>
        <NavbarItem
          href="/conclusion"
          color={router.route === "/conclusion" ? "#15ff79" : undefined}
        >
          Conclusion
        </NavbarItem>
      </NavbarInner>
    </NavbarWrapper>
  );
};
