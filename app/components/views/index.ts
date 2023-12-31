import { ReactNode } from "react";

export { LibraryView } from "./LibraryView";

export type ViewId = ScreenId | PopupId;

type ScreenId =
  | "library"
  | "artists"
  | "artist"
  | "albums"
  | "album"
  | "playlists"
  | "playlist"
  | "settings";

type PopupId =
  | "spotifyNotSupportedPopup"
  | "spotifyNonPremiumPopup"
  | "chooseServicePopup"
  | "signinPopup"
  | "signOutPopup";

export type ViewType = "screen" | "actionSheet" | "popup";

export type ViewOption = {
  id: ViewId;
  title: string;
  headerActions?: ReactNode;
  type: ViewType;
};

export const views: Record<ViewId, ViewOption> = {
  library: {
    id: "library",
    title: "Library",
    type: "screen",
  },
  artists: {
    id: "artists",
    title: "Artists",
    type: "screen",
  },
  artist: {
    id: "artist",
    title: "Artist",
    type: "screen",
  },
  albums: {
    id: "albums",
    title: "Albums",
    type: "screen",
  },
  album: {
    id: "album",
    title: "Album",
    type: "screen",
  },
  playlists: {
    id: "playlists",
    title: "Playlists",
    type: "screen",
  },
  playlist: {
    id: "playlist",
    title: "Playlist",
    type: "screen",
  },
  settings: {
    id: "settings",
    title: "Settings",
    type: "screen",
  },
  // music: { id: "music", title: "Music", type: WINDOW_TYPE.Screen },
  // settings: { id: "settings", title: "Settings", type: WINDOW_TYPE.Screen },

  // Action sheets
  // mediaActionSheet: {
  //   id: "mediaActionSheet",
  //   title: "Media Options",
  //   type: WINDOW_TYPE.ActionSheet,
  // },
  // serviceTypeActionSheet: {
  //   id: "serviceTypeActionSheet",
  //   title: "Service",
  //   type: WINDOW_TYPE.ActionSheet,
  // },

  // Popups
  spotifyNotSupportedPopup: {
    id: "spotifyNotSupportedPopup",
    title: "Unsupported browser",
    type: "popup",
  },
  spotifyNonPremiumPopup: {
    id: "spotifyNonPremiumPopup",
    title: "Premium",
    type: "popup",
  },
  signinPopup: {
    id: "signinPopup",
    title: "Sign in",
    type: "popup",
  },
  chooseServicePopup: {
    id: "chooseServicePopup",
    title: "Choose service",
    type: "popup",
  },
  signOutPopup: {
    id: "signOutPopup",
    title: "Sign out",
    type: "popup",
  },
};
