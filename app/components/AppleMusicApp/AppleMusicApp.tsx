"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsContext, SettingsProvider } from "hooks";
import AudioControls from "components/AudioControls/AudioControls";
import { ViewManager } from "components/ViewManager";
import { AudioPlayerProvider } from "hooks/audio";
import { MusicKitProvider } from "hooks/musicKit";
import { SpotifySDKProvider } from "hooks/spotify";
import ViewContextProvider from "providers/ViewContextProvider";
import { memo } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { getThemeConstants } from "utils/constants/theme";

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    height: 100dvh;
    margin: 0;
    width: 100vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${({ theme }) => theme.colors.content.primary};
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    font-feature-settings: "case";
    margin: 0;
    color: ${({ theme }) => theme.colors.content.primary};
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
    <RootContainer>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ViewContextProvider>
            <SettingsContext.Consumer>
              {([{ colorScheme }]) => (
                <ThemeProvider theme={getThemeConstants(colorScheme)}>
                  <GlobalStyles />
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
                </ThemeProvider>
              )}
            </SettingsContext.Consumer>
          </ViewContextProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </RootContainer>
  );
};

export default memo(AppleMusicApp);
