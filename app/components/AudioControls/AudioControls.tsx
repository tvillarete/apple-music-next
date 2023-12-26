import { SCREEN_ANIMATION_DURATION } from "animation";
import DragHandle from "components/AudioControls/components/DragHandle";
import NowPlayingArtwork from "components/AudioControls/components/NowPlayingArtwork";
import { motion, PanInfo } from "framer-motion";
import { useViewContext } from "hooks";
import { memo, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";
import MiniPlayerControls from "components/AudioControls/components/MiniPlayerControls";
import ExpandedPlayerControls from "components/AudioControls/components/ExpandedPlayerControls";

const MINI_PLAYER_HEIGHT = "64px";

const RootContainer = styled(motion.div)<{
  $isExpanded: boolean;
}>`
  align-items: start;
  background-color: white;
  border: 0.5px solid #acacac11;
  bottom: 0;
  display: grid;
  grid-template-rows: 48px 1fr 1.1fr;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 10;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      align-items: center;
      backdrop-filter: blur(50px);
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      box-shadow: 0px 10px 100px rgba(0, 0, 0, 0.5);
      grid-template-columns: 64px 1fr;
      grid-template-rows: unset;
      height: ${MINI_PLAYER_HEIGHT};
      margin: 12px 16px;
      padding: 0 8px;
    `}
`;

const AudioControls = () => {
  const { isAudioControlsDrawerOpen, toggleAudioControlsDrawer } =
    useViewContext();

  const layoutTransition = useMemo(
    () => ({
      type: "spring",
      mass: 0.3,
      duration: SCREEN_ANIMATION_DURATION,
    }),
    []
  );

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const isDraggedDown = info.offset.y > 100;
      const isDraggedUp = info.offset.y < 0;

      if (isDraggedUp && !isAudioControlsDrawerOpen) {
        toggleAudioControlsDrawer(true);
      } else if (isDraggedDown && isAudioControlsDrawerOpen) {
        toggleAudioControlsDrawer(false);
      }
    },
    [isAudioControlsDrawerOpen, toggleAudioControlsDrawer]
  );

  return (
    <RootContainer
      $isExpanded={isAudioControlsDrawerOpen}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={isAudioControlsDrawerOpen ? 0.5 : 0.1}
      layout
      onDragEnd={handleDrag}
      transition={layoutTransition}
    >
      {isAudioControlsDrawerOpen ? (
        <DragHandle onClick={() => toggleAudioControlsDrawer()} />
      ) : null}
      <NowPlayingArtwork size={isAudioControlsDrawerOpen ? "large" : "mini"} />
      {isAudioControlsDrawerOpen ? (
        <ExpandedPlayerControls />
      ) : (
        <MiniPlayerControls />
      )}
    </RootContainer>
  );
};

export default memo(AudioControls);
