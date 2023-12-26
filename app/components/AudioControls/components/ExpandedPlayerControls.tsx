import TrackControls from "components/AudioControls/components/TrackControls";
import { useAudioPlayer } from "hooks";
import { memo } from "react";
import styled from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
  height: 100%;
  width: 100%;
  max-width: 500px;
`;

const TrackInfoContainer = styled.div`
  min-height: 64px;
`;

const TitleText = styled.h3`
  font-weight: 600;
`;

const SubtitleText = styled.h3`
  font-weight: 400;
`;

const ExpandedPlayerControls = () => {
  const { nowPlayingItem, togglePlayPause } = useAudioPlayer();

  const title = nowPlayingItem?.name ?? "Not playing";
  const subtitle = nowPlayingItem?.artistName;

  return (
    <RootContainer>
      <TrackInfoContainer>
        <TitleText onClick={togglePlayPause}>{title}</TitleText>
        {!!subtitle && <SubtitleText>{subtitle}</SubtitleText>}
      </TrackInfoContainer>
      <TrackControls iconSize="large" />
    </RootContainer>
  );
};

export default memo(ExpandedPlayerControls);
