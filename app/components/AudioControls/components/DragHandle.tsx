import { memo } from "react";
import styled from "styled-components";

const RootContainer = styled.div`
  align-self: center;
  display: grid;
  place-items: center;
  width: 100%;
`;

const Handle = styled.div`
  width: 48px;
  height: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.content.tertiary};
  cursor: grab;
`;

interface DragHandleProps {
  onClick: () => void;
}

const DragHandle = ({ onClick }: DragHandleProps) => {
  return (
    <RootContainer onClick={onClick}>
      <Handle />
    </RootContainer>
  );
};

export default memo(DragHandle);
