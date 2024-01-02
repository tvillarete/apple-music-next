import React from "react";

export const allIcons = {
  album: React.lazy(() => import("components/Icon/icons/Album")),
  arrowLeft: React.lazy(() => import("components/Icon/icons/ArrowLeft")),
  arrowRight: React.lazy(() => import("components/Icon/icons/ArrowRight")),
  microphone: React.lazy(() => import("components/Icon/icons/Microphone")),
  musicJsLogo: React.lazy(() => import("components/Icon/icons/MusicJsLogo")),
  note: React.lazy(() => import("components/Icon/icons/Note")),
  pause: React.lazy(() => import("components/Icon/icons/Pause")),
  play: React.lazy(() => import("components/Icon/icons/Play")),
  user: React.lazy(() => import("components/Icon/icons/User")),
  skipNext: React.lazy(() => import("components/Icon/icons/SkipNext")),
  skipPrev: React.lazy(() => import("components/Icon/icons/SkipPrev")),
  volumeDown: React.lazy(() => import("components/Icon/icons/VolumeDown")),
  volumeUp: React.lazy(() => import("components/Icon/icons/VolumeUp")),
};
