import { fade } from "animation";
import { motion } from "framer-motion";
import { useAudioPlayer, useViewContext } from "hooks";
import { memo } from "react";
import styled from "styled-components";
import TrackControls from "components/AudioControls/components/TrackControls";

const RootContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  cursor: pointer;
`;

const TitleContainer = styled(motion.div)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleText = styled.p`
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface MiniPlayerControlsProps {}

const MiniPlayerControls = () => {
  const { toggleAudioControlsDrawer } = useViewContext();
  const { nowPlayingItem } = useAudioPlayer();

  const title = nowPlayingItem?.name ?? "Not playing";

  return (
    <RootContainer onClick={() => toggleAudioControlsDrawer(true)}>
      <TitleContainer layout {...fade}>
        <TitleText>{title}</TitleText>
      </TitleContainer>
      <TrackControls isSkipPrevButtonVisible={false} />
    </RootContainer>
  );
};

export default memo(MiniPlayerControls);
