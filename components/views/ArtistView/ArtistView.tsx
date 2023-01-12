import { useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { views } from "components/views";
import { AlbumView } from "components/views/AlbumView";
import * as Utils from "utils";
import { useFetchArtistAlbums } from "hooks/utils/useDataFetcher";

interface Props {
  id: string;
  /** Get artist from the user's library if true (otherwise search Apple Music). */
  inLibrary?: boolean;
}

const ArtistView = ({ id, inLibrary = false }: Props) => {
  const { data: albums, isLoading } = useFetchArtistAlbums({
    id,
    inLibrary,
  });
  const options: SelectableListOption[] = useMemo(
    () =>
      albums?.map((album) => ({
        type: "view",
        headerTitle: album.name,
        label: album.name,
        subLabel: album.artistName,
        image: {
          url: Utils.getArtwork(100, album.artwork?.url),
          styles: {
            borderRadius: 4,
          },
        },
        viewId: views.album.id,
        component: () => (
          <AlbumView id={album.id ?? ""} inLibrary={inLibrary} />
        ),
        longPressOptions: Utils.getMediaOptions("album", album.id),
      })) ?? [],
    [albums, inLibrary]
  );

  return (
    <SelectableList
      loading={isLoading}
      options={options}
      emptyMessage="No albums by this artist"
    />
  );
};

export default ArtistView;
