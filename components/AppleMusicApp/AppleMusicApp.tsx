import AudioControls from "components/AudioControls/AudioControls";
import { ViewManager } from "components/ViewManager";
import { AudioPlayerProvider } from "hooks/audio";
import { MusicKitProvider } from "hooks/musicKit";
import { SpotifySDKProvider } from "hooks/spotify";
import ViewContextProvider from "providers/ViewContextProvider";
import { memo } from "react";
import styled from "styled-components";

const RootContainer = styled.div`
  position: relative;
  height: 100%;
`;

interface Props {
  appleAccessToken: string;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
}

const AppleMusicApp = ({
  appleAccessToken,
  spotifyAccessToken,
  spotifyRefreshToken,
}: Props) => {
  return (
    <RootContainer>
      <ViewContextProvider>
        <SpotifySDKProvider
          initialAccessToken={spotifyAccessToken}
          refreshToken={spotifyRefreshToken}
        >
          <MusicKitProvider token={appleAccessToken}>
            <AudioPlayerProvider>
              <ViewManager />
              <AudioControls />
            </AudioPlayerProvider>
          </MusicKitProvider>
        </SpotifySDKProvider>
      </ViewContextProvider>
    </RootContainer>
  );
};

export default memo(AppleMusicApp);
