import { useMemo } from "react";

import { useSettings, useViewContext } from "hooks";
import * as Utils from "utils";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistView } from "components/views/ArtistView";
import styled from "styled-components";
import { useFetchArtists } from "hooks/utils/useDataFetcher";
import { views } from "components/views";

const RootContainer = styled.div``;

interface Props {
  artists?: MediaApi.Artist[];
  inLibrary?: boolean;
  showImages?: boolean;
}

const ArtistsView = ({
  artists,
  inLibrary = true,
  showImages = false,
}: Props) => {
  const { viewStack, setScreenViewOptions } = useViewContext();
  const { isAuthorized } = useSettings();
  const {
    data: fetchedArtists,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isQueryLoading,
  } = useFetchArtists({
    lazy: !!artists,
  });

  const options: SelectableListOption[] = useMemo(() => {
    const data =
      artists ?? fetchedArtists?.pages.flatMap((page) => page?.data ?? []);

    return (
      data?.map((artist) => ({
        type: "view",
        headerTitle: artist.name,
        label: artist.name,
        viewId: views.artist.id,
        imageUrl: showImages
          ? Utils.getArtwork(50, artist.artwork?.url) ?? "artists_icon.svg"
          : "",
        component: () => <ArtistView id={artist.id} inLibrary={inLibrary} />,
      })) ?? []
    );
  }, [artists, fetchedArtists, inLibrary, showImages]);

  // If accessing ArtistsView from the SearchView, and there is no data cached,
  // 'isQueryLoading' will be true. To prevent an infinite loading screen in these
  // cases, we'll check if we have any 'options'
  const isLoading = !options.length && isQueryLoading;

  return (
    <RootContainer>
      {isAuthorized ? (
        <SelectableList
          loading={isLoading}
          options={options}
          emptyMessage="No saved artists"
        />
      ) : (
        <p>AuthPrompt</p>
        // <AuthPrompt message="Sign in to view your artists" />
      )}
    </RootContainer>
  );
};

export default ArtistsView;
