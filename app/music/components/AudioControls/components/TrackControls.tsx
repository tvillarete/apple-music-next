import { motion } from "framer-motion";
import { fade } from "music/animation";
import Icon, { IconSize } from "music/components/Icon/Icon";
import { useAudioPlayer } from "music/hooks";
import { memo } from "react";
import styled from "styled-components";

const MediaIconContainer = styled(motion.div)`
  display: grid;
  place-items: center;
  grid-auto-flow: column;
`;

const MediaIcon = styled(Icon)`
  margin: 0 8px;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.8);
  }
`;

/**
 * The skip previous and skip next icons are wider than the play/pause icon.
 * This function increases the size of the icons to compensate for this.
 */
const increaseIconSize = (iconSize: IconSize): IconSize => {
  switch (iconSize) {
    case "small":
      return "medium";
    case "medium":
      return "large";
    case "large":
      return "xlarge";
    case "xlarge":
      return "xxlarge";
    default:
      return iconSize;
  }
};

export interface TrackControlsProps {
  isSkipPrevButtonVisible?: boolean;
  iconSize?: "small" | "medium" | "large";
}

const TrackControls = ({
  isSkipPrevButtonVisible = true,
  iconSize = "medium",
}: TrackControlsProps) => {
  const { togglePlayPause, skipNext, skipPrevious, playbackInfo } =
    useAudioPlayer();
  const { isPlaying } = playbackInfo;

  return (
    <MediaIconContainer
      onClick={(event) => {
        event?.stopPropagation();
      }}
      layout
      {...fade}
    >
      {isSkipPrevButtonVisible ? (
        <MediaIcon
          name="skipPrev"
          size={increaseIconSize(iconSize)}
          onClick={skipPrevious}
        />
      ) : null}
      {isPlaying ? (
        <MediaIcon name="pause" size={iconSize} onClick={togglePlayPause} />
      ) : (
        <MediaIcon name="play" size={iconSize} onClick={togglePlayPause} />
      )}
      <MediaIcon
        name="skipNext"
        size={increaseIconSize(iconSize)}
        onClick={skipNext}
      />
    </MediaIconContainer>
  );
};

export default memo(TrackControls);
