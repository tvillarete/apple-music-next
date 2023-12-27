import { Variants } from "framer-motion";

export const SCREEN_ANIMATION_DURATION = 0.35;

export type AnimationProperties = {
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
};

export const slideRightAnimation: AnimationProperties = {
  variants: {
    closed: { x: "110%" },
    open: {
      x: 0,
      transition: {
        duration: SCREEN_ANIMATION_DURATION,
        type: "tween",
        ease: "easeInOut",
      },
    },
    closing: {
      x: "110%",
      transition: {
        duration: SCREEN_ANIMATION_DURATION,
        type: "tween",
        ease: "easeInOut",
      },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const slideLeftAnimation: AnimationProperties = {
  variants: {
    closed: { x: "-110%" },
    open: {
      x: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
    closing: {
      x: "-110%",
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const slideUpAnimation = {
  variants: {
    closed: { y: "110%" },
    open: {
      y: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
    closing: {
      y: "110%",
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const popupAnimation = {
  variants: {
    closed: { scale: 1.2, opacity: 0 },
    open: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, type: "tween" },
    },
    closing: {
      opacity: 0,
      transition: { duration: 0.1, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const fade = {
  variants: {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    closing: {
      opacity: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const fadeScale = {
  variants: {
    closed: { opacity: 0, scale: 0.3 },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "tween" },
    },
    closing: {
      opacity: 0,
      scale: SCREEN_ANIMATION_DURATION,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const previewSlideRight = {
  variants: {
    closed: { x: "130%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, type: "tween" },
    },
    closing: {
      x: "130%",
      opacity: 0,
      transition: { duration: 0.4, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};

export const noAnimation = {
  variants: {
    closed: {},
    open: {},
    closing: {
      opacity: 0,
      transition: { duration: SCREEN_ANIMATION_DURATION, type: "tween" },
    },
  },
  initial: "closed",
  animate: "open",
  exit: "closing",
};
