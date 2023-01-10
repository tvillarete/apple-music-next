import React from "react";

export const allIcons = {
  album: React.lazy(() => import("components/Icon/icons/Album")),
  arrowLeft: React.lazy(() => import("components/Icon/icons/ArrowLeft")),
  arrowRight: React.lazy(() => import("components/Icon/icons/ArrowRight")),
  microphone: React.lazy(() => import("components/Icon/icons/Microphone")),
  note: React.lazy(() => import("components/Icon/icons/Note")),
  user: React.lazy(() => import("components/Icon/icons/User")),
};
