import { SCREEN_ANIMATION_DURATION } from "animation";
import { motion, useAnimationControls } from "framer-motion";
import { useAudioPlayer, useViewContext } from "hooks";
import { memo, useEffect } from "react";
import styled from "styled-components";
import * as Utils from "utils";

type Size = "mini" | "large";

const ArtworkImageContainer = styled(motion.div)<{
  $isActive: boolean;
  $size: Size;
}>`
  position: relative;
  height: ${({ $size }) => ($size === "large" ? "40vh" : "60px")};
  width: ${({ $size }) => ($size === "large" ? "40vh" : "60px")};

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

const ArtworkImage = styled(motion.img)<{ $size: Size }>`
  height: ${({ $size }) => ($size === "large" ? "40vh" : "60px")};
  width: ${({ $size }) => ($size === "large" ? "40vh" : "60px")};
  border-radius: ${({ $size }) => ($size === "large" ? "10px" : "6px")};
  pointer-events: none;
`;

interface NowPlayingArtworkProps {
  size: Size;
}

const NowPlayingArtwork = ({ size = "large" }: NowPlayingArtworkProps) => {
  const { nowPlayingItem, playbackInfo } = useAudioPlayer();
  const { isAudioControlsDrawerOpen } = useViewContext();
  const { isPlaying } = playbackInfo;
  const controls = useAnimationControls();

  const artwork =
    Utils.getArtwork(100, nowPlayingItem?.artwork?.url) ??
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
    <ArtworkImageContainer
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
    </ArtworkImageContainer>
  );
};

export default memo(NowPlayingArtwork);
