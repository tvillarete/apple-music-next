import { Scrubber } from "components/Scrubber";
import { useAudioPlayer, useInterval } from "hooks";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const RootContainer = styled.div``;

const getTrackPercent = (currentTime: number, duration: number) => {
  return Math.floor((currentTime / duration) * 100);
};

const TrackScrubber = () => {
  const { playbackInfo, updatePlaybackInfo, seekToTime } = useAudioPlayer();
  const { isPlaying, isPaused, currentTime, duration } = playbackInfo;
  const [percent, setPercent] = useState(
    getTrackPercent(currentTime, duration)
  );

  const handleProgressChange = useCallback(
    (updatedPercent: number) => {
      const newTime = (updatedPercent * duration) / 100;

      seekToTime(newTime);
      setPercent(updatedPercent);
    },
    [duration, seekToTime]
  );

  const shouldSkipInterval = !isPlaying || isPaused;

  useEffect(() => {
    setPercent(getTrackPercent(currentTime, duration));
  }, [currentTime, duration]);

  /** Update the progress bar every second. */
  useInterval(updatePlaybackInfo, 1000, shouldSkipInterval);

  return (
    <RootContainer>
      <Scrubber
        percent={percent}
        onChange={handleProgressChange}
        leftLabel="--:--"
        rightLabel="--:--"
      />
    </RootContainer>
  );
};

export default memo(TrackScrubber);
