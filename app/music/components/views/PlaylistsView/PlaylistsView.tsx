import { useMemo } from "react";

import { useSettings } from "music/hooks";
import * as Utils from "music/utils";

import { useFetchPlaylists } from "music/hooks/utils/useDataFetcher";
import { views } from "music/components/views";
import { PlaylistView } from "music/components/views/PlaylistView";
import SelectableList, {
  SelectableListOption,
} from "music/components/SelectableList";

interface Props {
  playlists?: MediaApi.Playlist[];
  inLibrary?: boolean;
}

const PlaylistsView = ({ playlists, inLibrary = true }: Props) => {
  const { isAuthorized } = useSettings();
  const { data: fetchedPlaylists, isLoading: isQueryLoading } =
    useFetchPlaylists({
      lazy: !!playlists,
    });

  const data =
    playlists ?? fetchedPlaylists?.pages.flatMap((page) => page?.data ?? []);

  const options: SelectableListOption[] = useMemo(
    () =>
      data?.map((playlist) => ({
        type: "view",
        label: playlist.name,
        subLabel: playlist.description || `By ${playlist.curatorName}`,
        image: {
          url: playlist.artwork?.url,
          size: 100,
          styles: {
            borderRadius: 8,
          },
        },
        viewId: views.playlist.id,
        headerTitle: playlist.name,
        component: () => (
          <PlaylistView id={playlist.id} inLibrary={inLibrary} />
        ),
        longPressOptions: Utils.getMediaOptions("playlist", playlist.id),
      })) ?? [],
    [data, inLibrary]
  );

  // If accessing PlaylistsView from the SearchView, and there is no data cached,
  // 'isQueryLoading' will be true. To prevent an infinite loading screen in these
  // cases, we'll check if we have any 'options'
  const isLoading = !options.length && isQueryLoading;

  return isAuthorized ? (
    <SelectableList
      loading={isLoading}
      options={options}
      emptyMessage="No saved playlists"
    />
  ) : (
    <p>Sign in to see playlists</p>
  );
};

export default PlaylistsView;
