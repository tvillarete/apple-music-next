import { SCREEN_ANIMATION_DURATION } from "animation";
import DragHandle from "components/AudioControls/components/DragHandle";
import MiniPlayer from "components/AudioControls/components/MiniPlayer";
import NowPlayingArtwork from "components/AudioControls/components/NowPlayingArtwork";
import TrackScrubber from "components/AudioControls/components/TrackScrubber";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useAudioPlayer } from "hooks";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import * as Utils from "utils";

const RootContainer = styled(motion.div)<{
  $isExpanded: boolean;
  $artworkUrl?: string;
}>`
  z-index: 10;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ $isExpanded: isOpen }) => (isOpen ? "100vh" : "100px")};
  border: 0.5px solid #acacac11;
  background-color: white;
`;

const ContentContainer = styled(motion.div)<{ $isExpanded: boolean }>`
  position: relative;
  display: grid;
  grid-template-rows: 40px 1.25fr 1fr;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
`;

const ArtworkContainer = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 24px;
`;

const TrackInfoContainer = styled.div`
  min-height: 64px;
`;

const MetadataContainer = styled.div``;

const TitleText = styled.h3`
  font-size: 18px;
  font-weight: normal;
`;

const SubtitleText = styled(TitleText)`
  font-size: 16px;
`;

const AudioControls = () => {
  const { nowPlayingItem, togglePlayPause } = useAudioPlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  const artwork =
    Utils.getArtwork(100, nowPlayingItem?.artwork?.url) ??
    "https://i.scdn.co/image/ab67616d00001e023b697b59e73fa10cb4871ea2";

  const title = nowPlayingItem?.name ?? "Not playing";
  const subtitle = nowPlayingItem?.artistName;

  const layoutTransition = useMemo(
    () => ({
      type: "spring",
      mass: 0.3,
      duration: SCREEN_ANIMATION_DURATION,
    }),
    []
  );

  const handleToggleExpandedState = useCallback(() => {
    setIsExpanded((prevState) => !prevState);
  }, []);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsExpanded((prevState) => {
        const isDraggedDown = info.offset.y > 100;
        const isDraggedUp = info.offset.y < 0;

        if (isDraggedUp && !prevState) {
          return true;
        } else if (isDraggedDown && prevState) {
          return false;
        }

        return prevState;
      });
    },
    []
  );

  return (
    <RootContainer
      $artworkUrl={artwork}
      $isExpanded={isExpanded}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      layout
      onDragEnd={handleDrag}
      transition={layoutTransition}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ContentContainer layout $isExpanded={isExpanded}>
            <DragHandle onClick={handleToggleExpandedState} />
            <ArtworkContainer>
              <NowPlayingArtwork size="large" />
            </ArtworkContainer>
            <MetadataContainer>
              <TrackInfoContainer>
                <TitleText onClick={togglePlayPause}>{title}</TitleText>
                {!!subtitle && <TitleText>{subtitle}</TitleText>}
              </TrackInfoContainer>
              <TrackScrubber />
            </MetadataContainer>
          </ContentContainer>
        ) : (
          <MiniPlayer onClick={handleToggleExpandedState} />
        )}
      </AnimatePresence>
    </RootContainer>
  );
};

export default memo(AudioControls);
