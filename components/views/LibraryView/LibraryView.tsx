import { memo, useCallback, useEffect, useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistsView } from "components/views/ArtistsView";
import { useSettings, useSpotifySDK, useViewContext } from "hooks";
import styled from "styled-components";
import { AlbumsView } from "components/views/AlbumsView";

const RootContainer = styled.div``;

const LibraryView = () => {
  const { isAuthorized } = useSettings();
  const { signIn: signInWithSpotify, signOut: signOutSpotify } =
    useSpotifySDK();
  const { setScreenViewOptions } = useViewContext();

  const handleChangedAuthStatus = useCallback(
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

  useEffect(() => {
    handleChangedAuthStatus(isAuthorized);
  }, [handleChangedAuthStatus, isAuthorized]);

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
