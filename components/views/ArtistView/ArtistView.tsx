import { useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { views } from "components/views";
import { AlbumView } from "components/views/AlbumView";
import { useDataFetcher } from "hooks";
import * as Utils from "utils";

interface Props {
  id: string;
  /** Get artist from the user's library if true (otherwise search Apple Music). */
  inLibrary?: boolean;
}

const ArtistView = ({ id, inLibrary = false }: Props) => {
  const { data: albums, isLoading } = useDataFetcher<MediaApi.Album[]>({
    name: "artist",
    id,
    inLibrary,
  });
  const options: SelectableListOption[] = useMemo(
    () =>
      albums?.map((album) => ({
        type: "view",
        title: album.name,
        label: album.name,
        sublabel: album.artistName,
        imageUrl: Utils.getArtwork(100, album.artwork?.url),
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
