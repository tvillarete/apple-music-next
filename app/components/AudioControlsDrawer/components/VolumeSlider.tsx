import Icon from "components/Icon/Icon";
import { Slider } from "components/Slider/Slider";
import { useMotionValue } from "framer-motion";
import { useAudioPlayer } from "hooks";
import { useCallback } from "react";

export const VolumeSlider = () => {
  const { volume, setVolume } = useAudioPlayer();
  const progress = useMotionValue(volume * 100);

  const handleSliderChange = useCallback(
    (value: number) => {
      setVolume(value / 100);
    },
    [setVolume]
  );

  progress.on("change", handleSliderChange);

  return (
    <Slider
      progress={progress}
      leadingContent={<Icon name="volumeDown" size="small" />}
      trailingContent={<Icon name="volumeUp" size="medium" />}
    />
  );
};
