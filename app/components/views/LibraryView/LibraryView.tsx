import { memo, useCallback, useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistsView } from "components/views/ArtistsView";
import { useSettings, useSpotifySDK, useViewContext } from "hooks";
import styled from "styled-components";
import { AlbumsView } from "components/views/AlbumsView";
import { PlaylistsView } from "components/views/PlaylistsView";
import { useMusicKit } from "hooks/musicKit/useMusicKit";

const RootContainer = styled.div``;

const LibraryView = () => {
  const { setColorScheme } = useSettings();
  const { setScreenViewOptions, showView } = useViewContext();
  const { signIn: signInWithSpotify, signOut: signOutSpotify } =
    useSpotifySDK();
  const { signIn: signInWithApple, signOut: signOutApple } = useMusicKit();

  const handleSignInClick = useCallback(() => {
    showView({
      type: "popup",
      id: "signinPopup",
      title: "Sign in",
      description: "Choose a service",
      listOptions: [
        {
          type: "action",
          label: "Spotify",
          onSelect: signInWithSpotify,
        },
        {
          type: "action",
          label: "Apple Music",
          onSelect: signInWithApple,
        },
        {
          type: "action",
          label: "Cancel",
          onSelect: () => {},
        },
      ],
    });
  }, [showView, signInWithApple, signInWithSpotify]);

  const handleSignOutClick = useCallback(() => {
    showView({
      type: "popup",
      id: "signOutPopup",
      title: "Sign out",
      description: "Choose a service to sign out of",
      listOptions: [
        {
          type: "action",
          label: "Spotify",
          onSelect: signOutSpotify,
        },
        {
          type: "action",
          label: "Apple Music",
          onSelect: signOutApple,
        },
        {
          type: "action",
          label: "Cancel",
          onSelect: () => {},
        },
      ],
    });
  }, [showView, signOutApple, signOutSpotify]);

  const handleChangeColorScheme = useCallback(() => {
    setColorScheme();
  }, [setColorScheme]);

  const handleAuthorizationChanged = useCallback(
    (value: boolean) => {
      setScreenViewOptions("library", {
        headerRightActions: [
          {
            onClick: handleChangeColorScheme,
            title: "Theme",
          },
          {
            onClick: value ? handleSignOutClick : handleSignInClick,
            title: value ? "Sign out" : "Sign in",
          },
        ],
      });
    },
    [
      handleChangeColorScheme,
      handleSignInClick,
      handleSignOutClick,
      setScreenViewOptions,
    ]
  );

  useSpotifySDK({
    onAuthorizationChanged: handleAuthorizationChanged,
  });

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Playlists",
        viewId: "playlists",
        iconLeft: { name: "note", size: "small", color: "#D34C4B" },
        component: () => <PlaylistsView />,
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
