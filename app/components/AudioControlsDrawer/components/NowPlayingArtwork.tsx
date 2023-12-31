import { SCREEN_ANIMATION_DURATION } from "animation";
import { motion, useAnimationControls } from "framer-motion";
import { useAudioPlayer, useViewContext } from "hooks";
import { memo, useEffect } from "react";
import styled, { css } from "styled-components";
import * as Utils from "utils";

type ArtworkSize = "mini" | "large";

const getArtworkPxFromSize = (size: ArtworkSize) => css`
  height: ${size === "large" ? "90vw" : "48px"};
  width: ${size === "large" ? "90vw" : "48px"};
  max-width: 400px;
  max-height: 400px;
`;

const getDropShadow = (size: ArtworkSize, isActive: boolean) => {
  if (size === "large") {
    return isActive
      ? "drop-shadow(-1px 15px 30px rgba(0, 0, 0, 0.5))"
      : "drop-shadow(-1px 15px 20px rgba(0, 0, 0, 0.3))";
  }

  return null;
};

const RootContainer = styled(motion.div)<{
  $isActive: boolean;
  $size: ArtworkSize;
}>`
  position: relative;
  ${({ $size }) => getArtworkPxFromSize($size)};
  border-radius: ${({ $size }) => ($size === "large" ? "10px" : "6px")};
  justify-self: center;
`;

const ArtworkImage = styled(motion.img)<{
  $size: ArtworkSize;
  $isActive: boolean;
}>`
  height: 100%;
  width: 100%;
  border-radius: ${({ $size }) => ($size === "large" ? "10px" : "6px")};
  pointer-events: none;
  filter: ${({ $isActive, $size }) => getDropShadow($size, $isActive)};
  transition: filter 0.1s ease-in-out;
`;

interface NowPlayingArtworkProps {
  size: ArtworkSize;
}

const NowPlayingArtwork = ({ size = "large" }: NowPlayingArtworkProps) => {
  const { nowPlayingItem, playbackInfo } = useAudioPlayer();
  const { isAudioControlsDrawerOpen } = useViewContext();
  const { isPlaying } = playbackInfo;
  const controls = useAnimationControls();

  const artwork =
    Utils.getArtwork(600, nowPlayingItem?.artwork?.url) ??
    "/music/default_album_artwork.png";

  useEffect(() => {
    if (isPlaying) {
      controls.start({
        scale: 1,
        className: isAudioControlsDrawerOpen ? "boxShadow" : undefined,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.5,
          delay: 0.05,
        },
      });
    } else {
      controls.start({
        scale: isAudioControlsDrawerOpen ? 0.7 : 1,
        transition: {
          type: "spring",
          duration: 0.7,
          bounce: 0,
          delay: 0.05,
        },
      });
    }
  }, [controls, isAudioControlsDrawerOpen, isPlaying]);

  const layoutTransition = {
    type: "spring",
    mass: 0.2,
    duration: SCREEN_ANIMATION_DURATION,
  };

  return (
    <RootContainer
      $isActive={isPlaying}
      animate={controls}
      $size={size}
      transition={layoutTransition}
    >
      <ArtworkImage
        $size={size}
        $isActive={isPlaying}
        layoutId="ac-now-laying-image"
        src={artwork}
        transition={layoutTransition}
      />
    </RootContainer>
  );
};

export default memo(NowPlayingArtwork);
