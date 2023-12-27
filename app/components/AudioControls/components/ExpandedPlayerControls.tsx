import TrackControls from "components/AudioControls/components/TrackControls";
import { useAudioPlayer } from "hooks";
import { memo } from "react";
import styled, { useTheme } from "styled-components";

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

const TitleText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

const SubtitleText = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

const ExpandedPlayerControls = () => {
  const theme = useTheme();
  const { nowPlayingItem, togglePlayPause } = useAudioPlayer();

  const title = nowPlayingItem?.name ?? "Not playing";
  const subtitle = nowPlayingItem?.artistName;

  return (
    <RootContainer>
      <TrackInfoContainer>
        <TitleText onClick={togglePlayPause}>{title}</TitleText>
        {!!subtitle && <SubtitleText>{subtitle}</SubtitleText>}
      </TrackInfoContainer>
      <TrackControls color={theme.colors.white} iconSize="large" />
    </RootContainer>
  );
};

export default memo(ExpandedPlayerControls);
