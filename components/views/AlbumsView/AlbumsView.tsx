import { useMemo } from "react";

import { useSettings } from "hooks";
import * as Utils from "utils";
import { views } from "components/views";
import { useFetchAlbums } from "hooks/utils/useDataFetcher";
import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { AlbumView } from "components/views/AlbumView";

interface Props {
  albums?: MediaApi.Album[];
  inLibrary?: boolean;
}

const AlbumsView = ({ albums, inLibrary = true }: Props) => {
  const { isAuthorized } = useSettings();
  const {
    data: fetchedAlbums,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchAlbums({
    // Don't fetch if we're passed an initial array of albums
    lazy: !!albums,
  });

  const options: SelectableListOption[] = useMemo(() => {
    const data =
      albums ?? fetchedAlbums?.pages.flatMap((page) => page?.data ?? []);

    return (
      data?.map((album) => ({
        type: "view",
        headerTitle: album.name,
        label: album.name,
        subLabel: album.artistName,
        image: { url: Utils.getArtwork(50, album.artwork?.url) ?? "" },
        viewId: views.album.id,
        component: () => (
          <AlbumView id={album.id ?? ""} inLibrary={inLibrary} />
        ),
      })) ?? []
    );
  }, [albums, fetchedAlbums, inLibrary]);

  return isAuthorized ? (
    <SelectableList
      loading={isLoading}
      // loadingNextItems={isFetchingNextPage}
      options={options}
      emptyMessage="No albums"
      variant="grid"
    />
  ) : (
    // TODO: Add AuthPrompt component
    <p>Sign in to view albums</p>
  );
};

export default AlbumsView;
