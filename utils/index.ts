import { SelectableListOption } from "components/SelectableList";

/** Accepts a url with '{w}' and '{h}' and replaces them with the specified size */
export const getArtwork = (size: number | string, url?: string) => {
  if (!url) {
    return undefined;
  }

  return url.replace("{w}", `${size}`).replace("{h}", `${size}`);
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
