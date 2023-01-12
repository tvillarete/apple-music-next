import { memo, useCallback, useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistsView } from "components/views/ArtistsView";
import { useSpotifySDK, useViewContext } from "hooks";
import styled from "styled-components";
import { AlbumsView } from "components/views/AlbumsView";

const RootContainer = styled.div``;

const LibraryView = () => {
  const { setScreenViewOptions } = useViewContext();
  const { signIn: signInWithSpotify, signOut: signOutSpotify } =
    useSpotifySDK();

  const handleAuthorizationChanged = useCallback(
    (value: boolean) => {
      setScreenViewOptions("library", {
        headerRightActions: [
          {
            onClick: value ? signOutSpotify : signInWithSpotify,
            title: value ? "Sign out" : "Sign in",
          },
        ],
      });
    },
    [setScreenViewOptions, signInWithSpotify, signOutSpotify]
  );

  useSpotifySDK({
    onAuthorizationChanged: handleAuthorizationChanged,
  });

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Playlists",
        viewId: "artists",
        iconLeft: { name: "note", size: "small", color: "#D34C4B" },
        component: () => <ArtistsView />,
      },
      {
        type: "view",
        label: "Artists",
        viewId: "artists",
        iconLeft: { name: "microphone", size: "small", color: "#D34C4B" },
        component: () => <ArtistsView />,
      },
      {
        type: "view",
        label: "Albums",
        viewId: "albums",
        iconLeft: { name: "album", size: "small", color: "#D34C4B" },
        component: () => <AlbumsView />,
      },
    ],
    []
  );

  return (
    <RootContainer>
      <SelectableList options={options} />
    </RootContainer>
  );
};

export default memo(LibraryView);
