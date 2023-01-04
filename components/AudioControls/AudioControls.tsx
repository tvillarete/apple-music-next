import { motion } from "framer-motion";
import { useAudioPlayer } from "hooks";
import { memo, useState } from "react";
import styled, { css } from "styled-components";
import * as Utils from "utils";

const RootContainer = styled(motion.div)<{ $isExpanded: boolean }>`
  z-index: 10;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ $isExpanded: isOpen }) => (isOpen ? "100vh" : "100px")};
  background-color: #f7f7f7;
  border: 0.5px solid #acacac11;
  backdrop-filter: blur(10px);
`;

const ContentContainer = styled(motion.div)<{ $isExpanded: boolean }>`
  display: flex;

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      /* display: block; */
    `};
`;

const NowPlayingImageContainer = styled(motion.div)<{ $isExpanded: boolean }>`
  height: ${({ $isExpanded: $isOpen }) => ($isOpen ? "80vw" : "100px")};
  width: ${({ $isExpanded: $isOpen }) => ($isOpen ? "100vw" : "100px")};
  display: flex;
  justify-content: center;
`;

const NowPlayingImage = styled(motion.img)<{ $isOpen: boolean }>`
  height: ${({ $isOpen }) => ($isOpen ? "80vw" : "100px")};
  width: ${({ $isOpen }) => ($isOpen ? "80vw" : "100px")};
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`;

const TitleText = styled.h3`
  font-size: 18px;
  font-weight: normal;
`;

const SubtitleText = styled(TitleText)`
  font-size: 16px;
`;

const AudioControls = () => {
  const { nowPlayingItem } = useAudioPlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  const artwork =
    Utils.getArtwork(100, nowPlayingItem?.artwork?.url) ??
    "https://i.scdn.co/image/ab67616d00001e023b697b59e73fa10cb4871ea2";

  const title = nowPlayingItem?.name ?? "Not playing";
  const subtitle = nowPlayingItem?.artistName;

  return (
    <RootContainer
      layout
      $isExpanded={isExpanded}
      onClick={() => setIsExpanded((prevState) => !prevState)}
    >
      <ContentContainer layout $isExpanded={isExpanded}>
        <NowPlayingImageContainer layout $isExpanded={isExpanded}>
          <NowPlayingImage $isOpen={isExpanded} src={artwork} layout />
        </NowPlayingImageContainer>
        <MetadataContainer>
          <TitleText>{title}</TitleText>
          {!!subtitle && <TitleText>{subtitle}</TitleText>}
        </MetadataContainer>
      </ContentContainer>
    </RootContainer>
  );
};

export default memo(AudioControls);
