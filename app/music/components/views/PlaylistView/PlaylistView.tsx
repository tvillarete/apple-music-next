import { useMemo } from "react";

import * as Utils from "music/utils";
import { useFetchPlaylist } from "music/hooks/utils/useDataFetcher";
import SelectableList, {
  SelectableListOption,
} from "music/components/SelectableList";

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
          url: song.artwork?.url,
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
