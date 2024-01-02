import {
  MotionConfig,
  MotionValue,
  PanInfo,
  Variants,
  motion,
  useTransform,
} from "framer-motion";
import { useCallback, useState } from "react";
import useMeasure from "react-use-measure";
import styled, { useTheme } from "styled-components";

const ContentContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BarContainer = styled(motion.div)`
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white}50;
  border-radius: 16px;
  overflow: clip;
  height: 10px;
  margin-bottom: 0.2rem;
`;

const Bar = styled(motion.div)`
  position: absolute;
  height: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white}90;
`;

const BottomContentContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export interface SliderProps {
  /** A value between 0 and 100 stored in an instance of `useMotionValue` */
  progress: MotionValue<number>;
  onChange?: (value: number) => void;
  leadingContent?: React.ReactNode;
  leadingBottomContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  trailingBottomContent?: React.ReactNode;
}

export const Slider = ({
  progress,
  onChange,
  leadingContent,
  trailingContent,
  leadingBottomContent,
  trailingBottomContent,
}: SliderProps) => {
  const theme = useTheme();

  const [isPanning, setIsPanning] = useState(false);

  const [containerRef, bounds] = useMeasure();
  const containerWidth = bounds.width;

  const width = useTransform(progress, (value) => `${value * 100}%`);

  const handlePanStart = useCallback(() => {
    setIsPanning(true);
  }, []);

  const handlePan = useCallback(
    (_: PointerEvent, info: PanInfo) => {
      setIsPanning(true);

      const deltaInPercent = info.delta.x / containerWidth;
      const updatedProgress = Math.max(
        0,
        Math.min(1, progress.get() + deltaInPercent)
      );

      progress.set(updatedProgress);
    },
    [containerWidth, progress]
  );

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
    onChange?.(progress.get());
  }, [onChange, progress]);

  const variants: Variants = {
    expanded: {
      scale: 1.02,
      color: "red",
    },
  };

  /** Controls the color of the content surrounding the progress bar */
  const colorAnimate = {
    color: isPanning ? theme.colors.white : `${theme.colors.white}80`,
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <motion.div whileTap="expanded" variants={variants}>
        <ContentContainer animate={colorAnimate}>
          {leadingContent ? <div>{leadingContent}</div> : null}
          <BarContainer
            ref={containerRef}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPointerDown={handlePanStart}
            onPanEnd={handlePanEnd}
            animate={isPanning ? "expanded" : undefined}
            variants={{
              expanded: {
                scaleY: 1.5,
                borderRadius: 24,
              },
            }}
          >
            <Bar style={{ width }} />
          </BarContainer>
          {trailingContent ? <div>{trailingContent}</div> : null}
        </ContentContainer>
        {leadingBottomContent || trailingBottomContent ? (
          <BottomContentContainer animate={colorAnimate}>
            <div>{leadingBottomContent}</div>
            <div>{trailingBottomContent}</div>
          </BottomContentContainer>
        ) : null}
      </motion.div>
    </MotionConfig>
  );
};
