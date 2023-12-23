import { fade } from "music/animation";
import NowPlayingArtwork from "music/components/AudioControls/components/NowPlayingArtwork";
import Icon from "music/components/Icon/Icon";
import { motion } from "framer-motion";
import { useAudioPlayer } from "music/hooks";
import { memo, MouseEventHandler } from "react";
import styled from "styled-components";
import * as Utils from "music/utils";

const RootContainer = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 86px 2fr 1fr;
  align-items: center;
  backdrop-filter: blur(50px);
  padding-left: 12px;
  cursor: pointer;
`;

const TitleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleText = styled.h3`
  font-size: 18px;
  font-weight: normal;
`;

const MediaIconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MediaIcon = styled(Icon)`
  margin: 0 8px;
  transition: transform 0.1s ease-in-out;

  :active {
    transform: scale(0.8);
  }
`;

interface MiniPlayerProps {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const MiniPlayer = ({ onClick }: MiniPlayerProps) => {
  const { nowPlayingItem, playbackInfo, togglePlayPause, skipNext } =
    useAudioPlayer();
  const { isPlaying } = playbackInfo;

  const artwork =
    Utils.getArtwork(100, nowPlayingItem?.artwork?.url) ??
    "https://i.scdn.co/image/ab67616d00001e023b697b59e73fa10cb4871ea2";

  const title = nowPlayingItem?.name ?? "Not playing";

  return (
    <RootContainer layout onClick={onClick}>
      <NowPlayingArtwork size="mini" />
      <TitleContainer layout {...fade}>
        <TitleText>{title}</TitleText>
      </TitleContainer>
      <MediaIconContainer
        onClick={(event) => {
          event?.stopPropagation();
        }}
        layout
        {...fade}
      >
        {isPlaying ? (
          <MediaIcon name="pause" size="large" onClick={togglePlayPause} />
        ) : (
          <MediaIcon name="play" size="large" onClick={togglePlayPause} />
        )}
        <MediaIcon name="skipNext" size="xxlarge" onClick={skipNext} />
      </MediaIconContainer>
    </RootContainer>
  );
};

export default memo(MiniPlayer);
