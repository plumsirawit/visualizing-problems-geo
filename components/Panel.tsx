import styled from "styled-components";

const PanelWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props: { backgroundColor?: string }) =>
    `background-color: ${props.backgroundColor ?? "#12141a"}`};
  color: white;
  position: relative;
`;
const PanelOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${(props: { flex?: boolean }) =>
    props.flex
      ? `display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  `
      : `inset: 0px;`}
`;
const PanelDecorator = styled.div`
  position: absolute;
  ${(props: { top?: boolean; index?: number }) => {
    if (props.top) {
      return `top: 0;
      right: ${(props.index ?? 0) * 4 + 3}rem;
      border-radius: 0px 0px 1rem 1rem;
      `;
    } else {
      return `bottom: 0;
      left: ${(props.index ?? 0) * 4 + 3}rem;
      border-radius: 1rem 1rem 0px 0px;
      `;
    }
  }}
  height: 15rem;
  width: 2rem;
  background-color: #383f46;
`;
export const Panel = (
  props: React.PropsWithChildren<{
    decorate?: boolean;
    backgroundColor?: string;
  }>
) => {
  return (
    <PanelWrapper backgroundColor={props.backgroundColor}>
      <PanelOverlay flex>{props.children}</PanelOverlay>
      {props.decorate && (
        <PanelOverlay>
          <PanelDecorator top index={0} />
          <PanelDecorator top index={1} />
          <PanelDecorator top index={2} />
          <PanelDecorator index={0} />
          <PanelDecorator index={1} />
          <PanelDecorator index={2} />
        </PanelOverlay>
      )}
    </PanelWrapper>
  );
};
