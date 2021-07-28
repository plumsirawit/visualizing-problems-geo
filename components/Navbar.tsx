import styled from "styled-components";

export const Navbar = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  color: white;
  top: 0px;
  position: absolute;
  transition: top 1s ease;
  z-index: 5;
`;
