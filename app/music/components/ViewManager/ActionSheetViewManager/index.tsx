import { AnimatePresence } from "framer-motion";
import { ViewOptions } from "music/providers/ViewContextProvider";
import styled, { css } from "styled-components";

import ActionSheet from "../components/ActionSheet";

type RootContainerProps = {
  $isHidden: boolean;
};

const RootContainer = styled.div<RootContainerProps>`
  z-index: 4;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);

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

const ActionSheetViewManager = ({ viewStack }: Props) => {
  const isHidden = viewStack.length === 0;

  return (
    <RootContainer data-stack-type="action-sheet" $isHidden={isHidden}>
      <AnimatePresence>
        {viewStack.map((view, index) => (
          <ActionSheet
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

export default ActionSheetViewManager;
