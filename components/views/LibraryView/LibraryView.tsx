import { memo, useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistsView } from "components/views/ArtistsView";
import { useSpotifySDK } from "hooks";
import styled from "styled-components";

const RootContainer = styled.div``;

const LibraryView = () => {
  const { signIn: signInWithSpotify } = useSpotifySDK();

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Playlists",
        viewId: "artists",
        component: () => <ArtistsView />,
      },
      {
        type: "view",
        label: "Artists",
        viewId: "artists",
        component: () => <ArtistsView />,
      },
      {
        type: "view",
        label: "Albums",
        viewId: "artists",
        component: () => <ArtistsView />,
      },
      {
        type: "view",
        label: "Songs",
        viewId: "artists",
        component: () => <ArtistsView />,
      },
    ],
    []
  );

  return (
    <RootContainer>
      <SelectableList options={options} />
      <button onClick={signInWithSpotify}>Sign in Spotify</button>
    </RootContainer>
  );
};

export default memo(LibraryView);
