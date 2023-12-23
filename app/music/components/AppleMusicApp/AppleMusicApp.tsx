"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "music/hooks";
import AudioControls from "music/components/AudioControls/AudioControls";
import { ViewManager } from "music/components/ViewManager";
import { AudioPlayerProvider } from "music/hooks/audio";
import { MusicKitProvider } from "music/hooks/musicKit";
import { SpotifySDKProvider } from "music/hooks/spotify";
import ViewContextProvider from "music/providers/ViewContextProvider";
import { memo } from "react";
import styled, { createGlobalStyle } from "styled-components";

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    width: 100vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    font-feature-settings: "case";
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <GlobalStyles />
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
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default memo(AppleMusicApp);
