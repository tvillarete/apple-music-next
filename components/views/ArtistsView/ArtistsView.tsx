import { useMemo } from "react";

import { useDataFetcher, useSettings, useViewContext } from "hooks";
import * as Utils from "utils";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistView } from "components/views/ArtistView";
import styled from "styled-components";

const RootContainer = styled.div``;

interface Props {
  artists?: IpodApi.Artist[];
  inLibrary?: boolean;
  showImages?: boolean;
}

const ArtistsView = ({
  artists,
  inLibrary = true,
  showImages = false,
}: Props) => {
  const { viewStack } = useViewContext();
  const { isAuthorized } = useSettings();
  const { data: fetchedArtists, isLoading } = useDataFetcher<IpodApi.Artist[]>({
    name: "artists",
    lazy: !!artists,
  });

  const options: SelectableListOption[] = useMemo(
    () =>
      (artists ?? fetchedArtists)?.map((artist) => ({
        type: "view",
        title: artist.name,
        label: artist.name,
        viewId: "artist",
        imageUrl: showImages
          ? Utils.getArtwork(50, artist.artwork?.url) ?? "artists_icon.svg"
          : "",
        component: () => <ArtistView id={artist.id} inLibrary={inLibrary} />,
      })) ?? [],
    [artists, fetchedArtists, inLibrary, showImages]
  );

  const prevView = useMemo(() => {
    const curViewIndex = viewStack.findIndex((view) => view.id === "artists");

    return curViewIndex - 1 >= 0 ? viewStack[curViewIndex - 1] : undefined;
  }, [viewStack]);

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
