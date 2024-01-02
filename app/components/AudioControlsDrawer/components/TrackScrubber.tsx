import { Slider } from "components/Slider/Slider";
import { format, set } from "date-fns";
import { useMotionValue } from "framer-motion";
import { useAudioPlayer, useEffectOnce, useInterval } from "hooks";
import { memo, useCallback, useEffect, useMemo } from "react";

const getTrackPercent = (currentTime: number, duration: number) => {
  return Math.round((currentTime / duration) * 100) || 0;
};

const TrackScrubber = () => {
  const { playbackInfo, updatePlaybackInfo, seekToTime, nowPlayingItem } =
    useAudioPlayer();
  const { isPlaying, isPaused, currentTime, duration } = playbackInfo;

  const hasNowPlayingItem = !!nowPlayingItem;

  const progress = useMotionValue(50);

  const percent = useMemo(
    () => getTrackPercent(currentTime, duration),
    [currentTime, duration]
  );

  const handleProgressChange = useCallback(
    (updatedPercent: number) => {
      const newTime = updatedPercent * duration;

      if (hasNowPlayingItem) {
        seekToTime(newTime);
      }
    },
    [duration, hasNowPlayingItem, seekToTime]
  );

  useEffect(() => {
    progress.set(percent / 100);
  }, [percent, progress]);

  // Make sure the playback info is updated when the component mounts.
  useEffectOnce(() => {
    updatePlaybackInfo();
  });

  const shouldSkipInterval = !isPlaying || isPaused;

  /** Update the progress bar every second. */
  useInterval(updatePlaybackInfo, 1000, shouldSkipInterval);

  const currentTimeLabel = useMemo(
    () =>
      hasNowPlayingItem
        ? format(
            set(new Date(), { hours: 0, minutes: 0, seconds: currentTime }),
            "mm:ss"
          )
        : "--:--",
    [currentTime, hasNowPlayingItem]
  );

  const durationLabel = useMemo(
    () =>
      hasNowPlayingItem
        ? format(
            set(new Date(), { hours: 0, minutes: 0, seconds: duration }),
            "mm:ss"
          )
        : "--:--",
    [duration, hasNowPlayingItem]
  );

  return (
    <Slider
      progress={progress}
      onChange={handleProgressChange}
      leadingBottomContent={currentTimeLabel}
      trailingBottomContent={durationLabel}
    />
  );
};

export default memo(TrackScrubber);
