import { AnimatePresence } from "framer-motion";
import styled, { css } from "styled-components";

import Popup from "../components/Popup";
import { ViewOptions } from "providers/ViewContextProvider";

interface ContainerProps {
  $isHidden: boolean;
}

const RootContainer = styled.div<ContainerProps>`
  z-index: 4;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black}80;

  ${({ $isHidden }) =>
    $isHidden &&
    css`
      background-color: transparent;
      pointer-events: none;
    `}
  transition: all 0.25s ease;
`;

interface Props {
  viewStack: ViewOptions[];
}

const PopupViewManager = ({ viewStack }: Props) => {
  const isHidden = viewStack.length === 0;

  return (
    <RootContainer data-stack-type="popup" $isHidden={isHidden}>
      <AnimatePresence>
        {viewStack.map((view, index) => (
          <Popup
            key={`view-${view.id}`}
            viewStack={viewStack}
            index={index}
            isHidden={index < viewStack.length - 1}
          />
        ))}
      </AnimatePresence>
    </RootContainer>
  );
};

export default PopupViewManager;
