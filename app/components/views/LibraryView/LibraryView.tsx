import { memo, useCallback, useEffect, useMemo } from "react";

import SelectableList, {
  SelectableListOption,
} from "components/SelectableList";
import { ArtistsView } from "components/views/ArtistsView";
import { useViewContext } from "hooks";
import styled from "styled-components";
import { AlbumsView } from "components/views/AlbumsView";
import { PlaylistsView } from "components/views/PlaylistsView";
import SettingsView from "components/views/SettingsView/SettingsView";

const RootContainer = styled.div``;

const LibraryView = () => {
  const { setScreenViewOptions, showView } = useViewContext();

  const handleOpenSettings = useCallback(() => {
    showView({
      type: "screen",
      id: "settings",
      title: "Settings",
      component: () => <SettingsView />,
    });
  }, [showView]);

  useEffect(() => {
    setScreenViewOptions("library", {
      headerRightActions: [
        {
          iconName: "user",
          onClick: handleOpenSettings,
        },
      ],
    });
  }, [handleOpenSettings, setScreenViewOptions]);

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
