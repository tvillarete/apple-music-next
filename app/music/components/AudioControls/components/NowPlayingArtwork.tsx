import { SCREEN_ANIMATION_DURATION } from "music/animation";
import { motion, useAnimationControls } from "framer-motion";
import { useAudioPlayer, useViewContext } from "music/hooks";
import { memo, useEffect } from "react";
import styled, { css } from "styled-components";
import * as Utils from "music/utils";

type ArtworkSize = "mini" | "large";

const ARTWORK_PX_LARGE = css`
  height: minMax(80vw, 500px);
  width: clamp(80vw, 500px);
`;
const ARTWORK_PX_MINI = css`
  height: 60px;
  width: 60px;
`;

const getArtworkPxFromSize = (size: ArtworkSize) => css`
  height: min(400px, ${size === "large" ? "90vw" : "60px"});
  width: min(400px, ${size === "large" ? "90vw" : "60px"});
`;

const RootContainer = styled(motion.div)<{
  $isActive: boolean;
  $size: ArtworkSize;
}>`
  position: relative;
  height: ${({ $size }) => getArtworkPxFromSize($size)};
  width: ${({ $size }) => getArtworkPxFromSize($size)};

  ::after {
    bottom: 10px;
    box-shadow: ${({ $size }) =>
      $size === "large" ? "-1px 15px 30px rgba(0, 0, 0, 0.5)" : "none"};
    content: "";
    left: 10px;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    position: absolute;
    right: 10px;
    top: 10px;
    transition: opacity 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: -1;
  }
`;

const ArtworkImage = styled(motion.img)<{ $size: ArtworkSize }>`
  height: ${({ $size }) => getArtworkPxFromSize($size)};
  width: ${({ $size }) => getArtworkPxFromSize($size)};
  border-radius: ${({ $size }) => ($size === "large" ? "10px" : "6px")};
  pointer-events: none;
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
    Utils.getArtwork(100, nowPlayingItem?.artwork?.url) ??
    "/default_album_artwork.png";

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
      layoutId="ac-now-playing-image-container"
      $isActive={isPlaying}
      animate={controls}
      $size={size}
      transition={layoutTransition}
    >
      <ArtworkImage
        $size={size}
        layoutId="ac-now-laying-image"
        src={artwork}
        transition={layoutTransition}
      />
    </RootContainer>
  );
};

export default memo(NowPlayingArtwork);
