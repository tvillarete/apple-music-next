import TrackControls from "components/AudioControlsDrawer/components/TrackControls";
import { useAudioPlayer } from "hooks";
import { memo } from "react";
import styled, { useTheme } from "styled-components";
import TrackScrubber from "components/AudioControlsDrawer/components/TrackScrubber";
import { VolumeSlider } from "components/AudioControlsDrawer/components/VolumeSlider";
import { motion } from "framer-motion";

const RootContainer = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  gap: 48px;
  max-width: 500px;
  padding-bottom: 48px;
`;

const TitleContainer = styled.div`
  display: grid;
  gap: 2px;
`;

const TitleText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

const SubtitleText = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white}80;
`;

const ExpandedPlayerControls = () => {
  const theme = useTheme();
  const { nowPlayingItem } = useAudioPlayer();

  const title = nowPlayingItem?.name ?? "Not playing";
  const subtitle = nowPlayingItem?.artistName;

  return (
    <RootContainer>
      <TitleContainer>
        <TitleText>{title}</TitleText>
        {!!subtitle && <SubtitleText>{subtitle}</SubtitleText>}
      </TitleContainer>
      <TrackScrubber />
      <TrackControls color={theme.colors.white} iconSize="large" />
      <VolumeSlider />
    </RootContainer>
  );
};

export default memo(ExpandedPlayerControls);
