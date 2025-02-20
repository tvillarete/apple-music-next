import { useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import * as Utils from "utils";
import { useFetchAlbum } from "hooks/utils/useDataFetcher";

interface Props {
  id: string;
  /** Get album from the user's library if true (otherwise search Apple Music). */
  inLibrary?: boolean;
}

const AlbumView = ({ id, inLibrary = false }: Props) => {
  const { data: album, isLoading } = useFetchAlbum({
    id,
    inLibrary,
  });

  const options: SelectableListOption[] = useMemo(
    () =>
      album?.songs.map((song, index) => ({
        type: "song",
        label: song.name,
        queueOptions: {
          album,
          startPosition: index,
        },
        showNowPlayingView: true,
        longPressOptions: Utils.getMediaOptions("song", song.id),
      })) ?? [],
    [album]
  );

  return (
    <SelectableList
      loading={isLoading}
      options={options}
      emptyMessage="No saved songs"
    />
  );
};

export default AlbumView;
