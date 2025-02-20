import { SelectableListOption } from "components/SelectableList";

/** Accepts a url with '{w}' and '{h}' and replaces them with the specified size */
export const getArtwork = (size: number | string, url?: string) => {
  if (!url) {
    return undefined;
  }

  const urlWithSize = url.replace("{w}", `${size}`).replace("{h}", `${size}`);
  return urlWithSize;
};

export const setDocumentSongTitle = (song?: AppleMusicApi.Song) => {
  document.title = song
    ? `${song.attributes?.name ?? "Music"} – Music.js`
    : "Music.js";
};

/** Returns a list of playback options to display in a popup for an album, song, or playlist. */
export const getMediaOptions = (
  type: "album" | "song" | "playlist",
  id: string
): SelectableListOption[] => {
  const music = window.MusicKit.getInstance();

  return [
    {
      type: "action",
      label: "Play Next",
      onSelect: () =>
        music.playNext({
          [type]: id,
        }),
    },
    {
      type: "action",
      label: "Play Later",
      onSelect: () =>
        music.playLater({
          [type]: id,
        }),
    },
  ];
};

/**
 *
 * [Client-side only] Returns the root URL of the app, depending on the environment
 */
export const getRootAppUrl = () => {
  const isDev = process.env.NODE_ENV === "development";

  const protocol = isDev ? "http" : "https";
  const rootUrl = isDev ? `localhost:3000` : process.env.VERCEL_BASE_URL;

  return `${protocol}://${rootUrl}`;
};
