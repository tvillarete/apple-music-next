import { SCREEN_ANIMATION_DURATION } from "animation";
import DragHandle from "components/AudioControls/components/DragHandle";
import NowPlayingArtwork from "components/AudioControls/components/NowPlayingArtwork";
import { motion, PanInfo } from "framer-motion";
import { useAudioPlayer, useViewContext } from "hooks";
import { memo, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";
import MiniPlayerControls from "components/AudioControls/components/MiniPlayerControls";
import ExpandedPlayerControls from "components/AudioControls/components/ExpandedPlayerControls";

const MINI_PLAYER_HEIGHT = "64px";

const RootContainer = styled(motion.div)<{
  $isExpanded: boolean;
}>`
  align-items: start;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  bottom: 0;
  display: grid;
  grid-template-rows: 48px 1fr 1.1fr;
  height: 100dvh;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 10;
  overflow: clip;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      align-items: center;
      backdrop-filter: blur(50px);
      background-color: ${({ theme }) => theme.colors.background.tertiary}50;
      border-radius: 16px;
      box-shadow: 0px 10px 100px rgba(0, 0, 0, 0.5);
      grid-template-columns: 64px 1fr;
      grid-template-rows: unset;
      height: ${MINI_PLAYER_HEIGHT};
      margin: 12px 16px;
      padding: 0 8px;
    `}
`;

const ArtworkBackground = styled.div<{ url?: string }>`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.url ? `url('${props.url}')` : "transparent")}
    no-repeat center center;
  background-size: cover;
  filter: blur(60px) brightness(0.4);
  contain: paint;
  transition: background 0.5s ease-in-out;
  transform: scale(1.2);
`;

const AudioControls = () => {
  const { isAudioControlsDrawerOpen, toggleAudioControlsDrawer } =
    useViewContext();
  const { nowPlayingItem } = useAudioPlayer();
  const albumArtworkUrl = nowPlayingItem?.artwork?.url;

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
      <ArtworkBackground url={albumArtworkUrl} />
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
