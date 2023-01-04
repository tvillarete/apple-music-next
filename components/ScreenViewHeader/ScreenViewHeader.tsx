import { SCREEN_ANIMATION_DURATION, slideRightAnimation } from "animation";
import Icon from "components/Icon/Icon";
import { backArrowAnimation } from "components/ScreenViewHeader/animation";
import { ViewId, views } from "components/views";
import { AnimatePresence, motion } from "framer-motion";
import { useViewContext } from "hooks";
import { memo, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";

const RootContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 16px;
`;

const TopRowContainer = styled.div`
  position: relative;
  height: 32px;
  width: 100%;
`;

const BottomRowContainer = styled(motion.div)`
  position: relative;
  height: 32px;
  width: 100%;
`;

const BackButtonContainer = styled.div`
  position: relative;
`;

const BackButtonIconContainer = styled(motion.div)`
  position: absolute;
  top: 1px;
  left: -4px;
`;

const Text = styled(motion.p)<{
  $isTitle?: boolean;
  $isHidden?: boolean;
  $noAnimation?: boolean;
}>`
  display: inline-block;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  margin-left: ${({ $isHidden }) => ($isHidden ? "-100px" : "16px")};
  color: red;
  cursor: pointer;
  transition: all ${SCREEN_ANIMATION_DURATION}s ease;
  animation: ${({ $noAnimation }) =>
      $noAnimation ? "delayEnter" : "enterBackButton"}
    ${SCREEN_ANIMATION_DURATION}s ease;

  @keyframes delayEnter {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes enterBackButton {
    0% {
      opacity: 0;
      font-size: 28px;
      font-weight: 600;
      margin-left: 0;
      color: black;
    }
    100% {
      opacity: 1;
      margin-left: 16px;
    }
  }

  :active {
    opacity: 0.5;
  }

  ${({ $isTitle }) =>
    $isTitle
      ? css`
          font-size: 28px;
          font-weight: 600;
          margin-left: 0;
          color: black;
          cursor: default;
          pointer-events: none;
          animation: none;
        `
      : null};
`;

export interface ScreenViewHeaderProps {
  viewId: ViewId;
}

const ViewHeader = ({ viewId }: ScreenViewHeaderProps) => {
  const { hideView, viewStack } = useViewContext();

  const viewIndex = useMemo(
    () => viewStack.findIndex((view) => view.id === viewId),
    [viewId, viewStack]
  );

  const prevViewIndex = viewIndex - 1;

  const viewOptions = useMemo(
    () => (viewIndex >= 0 ? viewStack[viewIndex] : undefined),
    [viewIndex, viewStack]
  );

  const prevViewOptions = useMemo(
    () => (prevViewIndex >= 0 ? viewStack[prevViewIndex] : undefined),
    [prevViewIndex, viewStack]
  );

  const titleText = useMemo(() => {
    if (viewOptions?.type !== "screen") {
      return undefined;
    }

    return viewOptions.title ?? views[viewId].title;
  }, [viewId, viewOptions]);

  const backButtonText = useMemo(() => {
    if (prevViewOptions?.type !== "screen") {
      return undefined;
    }

    return prevViewOptions.title ?? views[prevViewOptions.id].title;
  }, [prevViewOptions]);

  /** The base view is the view at the bottom of the stack. */
  const isBaseView = viewIndex === 0;
  const isActiveView = viewIndex === viewStack.length - 1;
  const isInactiveView = viewIndex < viewStack.length - 1;
  const isHiddenView = viewIndex < viewStack.length - 2;

  const handleBackClick = useCallback(() => {
    hideView();
  }, [hideView]);

  return (
    <RootContainer key={`header-${viewId}`}>
      <TopRowContainer>
        <BackButtonContainer onClick={handleBackClick}>
          <AnimatePresence>
            {viewStack.length > 1 ? (
              <BackButtonIconContainer {...backArrowAnimation}>
                <Icon name="arrowLeft" color="red" size="small" />
              </BackButtonIconContainer>
            ) : null}
          </AnimatePresence>
          {backButtonText && isActiveView ? (
            <Text $noAnimation $isHidden={isHiddenView}>
              {backButtonText}
            </Text>
          ) : null}
          {isInactiveView ? (
            <motion.div
              layoutId={viewOptions ? `header-title-${viewId}` : undefined}
            >
              <Text $isTitle={isActiveView} $isHidden={isHiddenView}>
                {titleText}
              </Text>
            </motion.div>
          ) : null}
        </BackButtonContainer>
      </TopRowContainer>
      <AnimatePresence>
        {viewOptions ? (
          <BottomRowContainer
            key={`view-${viewId}`}
            {...(isBaseView ? null : slideRightAnimation)}
          >
            <motion.div
              layoutId={viewOptions ? `header-title-${viewId}` : undefined}
            >
              <Text $isTitle={isActiveView} $isHidden={isHiddenView}>
                {isInactiveView ? undefined : titleText}
              </Text>
            </motion.div>
          </BottomRowContainer>
        ) : null}
      </AnimatePresence>
    </RootContainer>
  );
};

export default memo(ViewHeader);
