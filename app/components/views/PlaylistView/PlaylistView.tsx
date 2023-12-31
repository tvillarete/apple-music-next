import { useMemo } from "react";

import * as Utils from "utils";
import { useFetchPlaylist } from "hooks/utils/useDataFetcher";
import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";

interface Props {
  id: string;
  /** Get playlist from the user's library if true (otherwise search Apple Music). */
  inLibrary?: boolean;
}

const PlaylistView = ({ id, inLibrary = false }: Props) => {
  const { data: playlist, isLoading } = useFetchPlaylist({
    id,
    inLibrary,
  });

  const options: SelectableListOption[] = useMemo(
    () =>
      playlist?.songs.map((song, index) => ({
        type: "song",
        label: song.name,
        subLabel: song.artistName ?? "Unknown artist",
        image: {
          url: Utils.getArtwork(200, song.artwork?.url) ?? "",
          size: 64,
          styles: {
            borderRadius: 4,
          },
        },
        queueOptions: {
          playlist,
          startPosition: index,
        },
        showNowPlayingView: true,
        longPressOptions: Utils.getMediaOptions("song", song.id),
      })) ?? [],
    [playlist]
  );

  return (
    <SelectableList
      loading={isLoading}
      options={options}
      emptyMessage="No songs in this playlist"
    />
  );
};

export default PlaylistView;
