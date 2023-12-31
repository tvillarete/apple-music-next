import { useAudioPlayer, useEffectOnce, useInterval } from "hooks";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";

const RootContainer = styled.div``;

const getTrackPercent = (currentTime: number, duration: number) => {
  return Math.floor((currentTime / duration) * 100);
};

const TrackScrubber = () => {
  const { playbackInfo, updatePlaybackInfo } = useAudioPlayer();
  const { isPlaying, isPaused, currentTime, duration } = playbackInfo;
  const [, setPercent] = useState(getTrackPercent(currentTime, duration));
  // const hasNowPlayingItem = !!nowPlayingItem;

  // const handleProgressChange = useCallback(
  //   (updatedPercent: number) => {
  //     const newTime = (updatedPercent * duration) / 100;

  //     seekToTime(newTime);
  //     setPercent(updatedPercent);
  //   },
  //   [duration, seekToTime]
  // );

  const shouldSkipInterval = !isPlaying || isPaused;

  useEffect(() => {
    setPercent(getTrackPercent(currentTime, duration));
  }, [currentTime, duration]);

  // Make sure the playback info is updated when the component mounts.
  useEffectOnce(() => {
    updatePlaybackInfo();
  });

  /** Update the progress bar every second. */
  useInterval(updatePlaybackInfo, 1000, shouldSkipInterval);

  // const leftLabel = useMemo(
  //   () =>
  //     hasNowPlayingItem
  //       ? format(
  //           set(new Date(), { hours: 0, minutes: 0, seconds: currentTime }),
  //           "mm:ss"
  //         )
  //       : "--:--",
  //   [currentTime, hasNowPlayingItem]
  // );

  // const rightLabel = useMemo(
  //   () =>
  //     hasNowPlayingItem
  //       ? format(
  //           set(new Date(), { hours: 0, minutes: 0, seconds: duration }),
  //           "mm:ss"
  //         )
  //       : "--:--",
  //   [duration, hasNowPlayingItem]
  // );

  return (
    <RootContainer>
      {/* TODO: Replace this with Next UI Scrubber */}
      <div>Scrubber</div>
    </RootContainer>
  );
};

export default memo(TrackScrubber);
