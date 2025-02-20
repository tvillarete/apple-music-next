import { AnimatePresence } from "framer-motion";
import { ViewOptions } from "providers/ViewContextProvider";
import { memo } from "react";
import styled from "styled-components";

import { ScreenView } from "../components";

const Container = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

interface Props {
  viewStack: ViewOptions[];
}

const ScreenViewManager = ({ viewStack }: Props) => {
  return (
    <Container data-stack-type="fullscreen">
      <AnimatePresence>
        {viewStack.map((view, index) => (
          <ScreenView
            key={`view-${view.id}`}
            viewStack={viewStack}
            index={index}
          />
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default memo(ScreenViewManager);
