import React from "react";

export const allIcons = {
  album: React.lazy(() => import("music/components/Icon/icons/Album")),
  arrowLeft: React.lazy(() => import("music/components/Icon/icons/ArrowLeft")),
  arrowRight: React.lazy(
    () => import("music/components/Icon/icons/ArrowRight")
  ),
  microphone: React.lazy(
    () => import("music/components/Icon/icons/Microphone")
  ),
  note: React.lazy(() => import("music/components/Icon/icons/Note")),
  pause: React.lazy(() => import("music/components/Icon/icons/Pause")),
  play: React.lazy(() => import("music/components/Icon/icons/Play")),
  user: React.lazy(() => import("music/components/Icon/icons/User")),
  skipNext: React.lazy(() => import("music/components/Icon/icons/SkipNext")),
  skipPrev: React.lazy(() => import("music/components/Icon/icons/SkipPrev")),
};
