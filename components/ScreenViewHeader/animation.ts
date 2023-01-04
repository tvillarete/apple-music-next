import { AnimationProperties, SCREEN_ANIMATION_DURATION } from "animation";

export const backArrowAnimation: AnimationProperties = {
  variants: {
    closed: { x: "20%", opacity: 0, scale: 0 },
    open: {
      x: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
      opacity: 1,
      scale: 1,
    },
    closing: {
      x: "20%",
      opacity: 0,
      scale: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};
