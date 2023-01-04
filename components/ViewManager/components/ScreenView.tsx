import { useMemo } from "react";

import {
  noAnimation,
  SCREEN_ANIMATION_DURATION,
  slideRightAnimation,
} from "animation";
import { motion } from "framer-motion";
import { ViewOptions } from "providers/ViewContextProvider";
import styled from "styled-components";
import { ScreenViewHeader } from "components/ScreenViewHeader";

interface ContainerProps {
  index: number;
}

/** Responsible for putting the view at the proper z-index. */
const RootContainer = styled.div<ContainerProps>`
  background-color: white;
  z-index: ${(props) => props.index};
`;

export const AnimatedRootContainer = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 84px;
  background-color: white;
`;

interface ContentTransitionContainerProps {
  isHidden: boolean;
}

/** Slides the view to the left if it isn't at the top of the stack. */
const ContentTransitionContainer = styled.div<ContentTransitionContainerProps>`
  height: 100%;
  transition: transform ${SCREEN_ANIMATION_DURATION}s;
  transform: ${(props) => props.isHidden && "translateX(-20%)"};
  overflow: auto;
`;

interface Props {
  viewStack: ViewOptions[];
  index: number;
  isHidden: boolean;
}

const ScreenView = ({ viewStack, index }: Props) => {
  const options = viewStack[index];
  const firstInStack = index === 0;

  const ViewComponent = useMemo(() => {
    switch (options.type) {
      case "screen":
        return options.component;
      default:
        return null;
    }
  }, [options]);

  if (options.type !== "screen") {
    return null;
  }

  return (
    <RootContainer index={index}>
      <ScreenViewHeader viewId={options.id} />
      <AnimatedRootContainer
        data-view-id={options.id}
        {...(firstInStack ? noAnimation : slideRightAnimation)}
      >
        <ContentTransitionContainer isHidden={index < viewStack.length - 1}>
          <ViewComponent />
        </ContentTransitionContainer>
      </AnimatedRootContainer>
    </RootContainer>
  );
};

export default ScreenView;