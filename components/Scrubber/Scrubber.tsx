import { motion, useDragControls, useMotionValue } from "framer-motion";
import { clamp } from "lodash";
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const DRAG_HANDLE_WIDTH = 24;

const RootContainer = styled.div`
  width: 100%;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Bar = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  height: 4px;
  left: 0;
  right: 0;
  border-radius: 4px;
`;

const DragHandleContainer = styled(motion.div)`
  z-index: 1;
`;

const DragHandle = styled(motion.div)`
  width: ${DRAG_HANDLE_WIDTH}px;
  height: 24px;
  margin-left: -12px;
  border-radius: 50%;
  background-color: rgb(133, 133, 133);
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface ScrubberProps {
  /** Value from 0 to 100. */
  percent: number;
  onChange: (updatedPercent: number) => void;
  leftLabel?: ReactNode;
  rightLabel?: ReactNode;
}

const Scrubber = ({
  percent,
  onChange,
  leftLabel,
  rightLabel,
}: ScrubberProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);

  const dragHandleX = useMotionValue(0);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    const barWidth = barContainerRef.current?.getBoundingClientRect().width;
    const offsetX = dragHandleX.get();

    if (!barWidth) {
      console.log("Bar width undefined");
      return;
    }

    const updatedPercent = Math.floor((offsetX / barWidth) * 100);

    onChange(updatedPercent);
  }, [dragHandleX, onChange]);

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      const dragHandleCenter = DRAG_HANDLE_WIDTH / 2;
      const offsetX = Math.floor(event.offsetX - dragHandleCenter);
      const barWidth = barContainerRef.current?.getBoundingClientRect().width;

      if (!barWidth) {
        console.log("Bar width undefined");
        return;
      }

      const updatedPosition = clamp(offsetX, 0, barWidth);

      dragHandleX.set(updatedPosition);
    },
    [dragHandleX]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleUpdatePosition = useCallback(() => {
    const barWidth = barContainerRef.current?.getBoundingClientRect().width;

    if (!barWidth) {
      console.log("Bar width undefined");
      return;
    }

    const offsetX = Math.floor((percent / 100) * barWidth);
    const updatedOffsetX = clamp(offsetX, 0, barWidth);

    dragHandleX.set(updatedOffsetX);
  }, [dragHandleX, percent]);

  /** When the `percent` prop is updated, update the position of the drag handle. */
  useEffect(handleUpdatePosition, [handleUpdatePosition]);

  return (
    <RootContainer>
      <BarContainer ref={barContainerRef}>
        <Bar />
        <DragHandleContainer
          drag="x"
          dragConstraints={barContainerRef}
          dragControls={dragControls}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onPointerDown={handleDragStart}
          onPointerUp={handlePointerUp}
          onClick={handlePointerUp}
          ref={dragHandleRef}
          style={{ x: dragHandleX }}
        >
          <DragHandle
            animate={{ scale: isDragging ? 1 : 0.25 }}
            transition={{ type: "tween", duration: 0.15 }}
            initial={false}
          />
        </DragHandleContainer>
      </BarContainer>
      <LabelContainer>
        <div>{leftLabel}</div>
        <div>{rightLabel}</div>
      </LabelContainer>
    </RootContainer>
  );
};

export default memo(Scrubber);
