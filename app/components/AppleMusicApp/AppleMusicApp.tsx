"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsContext, SettingsProvider, useEffectOnce } from "hooks";
import AudioControlsDrawer from "components/AudioControlsDrawer/AudioControlsDrawer";
import { ViewManager } from "components/ViewManager";
import { AudioPlayerProvider } from "hooks/audio";
import ViewContextProvider from "providers/ViewContextProvider";
import { memo, useCallback, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { getThemeConstants } from "utils/theme";
import { SpotifySDKProvider } from "providers/SpotifySdkProvider";
import * as SpotifyUtils from "utils/spotify";
import { GlobalStyles } from "components/AppleMusicApp/GlobalStyles";
import { useRouter } from "next/navigation";
import { MusicKitProvider } from "providers/MusicKitProvider";
import Script from "next/script";

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface Props {
  appleAccessToken: string;
  /**
   * Used when the user is redirected back from Spotify's OAuth flow.
   * This is the code that is used to get the access token.
   */
  spotifyCallbackCode?: string;
}

const AppleMusicApp = ({ appleAccessToken, spotifyCallbackCode }: Props) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const handleCheckSpotifyCallback = useCallback(
    async (code: string) => {
      await SpotifyUtils.handleSpotifyCode(code);

      setIsLoading(false);

      router.replace("/");
    },
    [router]
  );

  useEffectOnce(() => {
    if (spotifyCallbackCode) {
      handleCheckSpotifyCallback(spotifyCallbackCode);
      return;
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <RootContainer>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ViewContextProvider>
            <SpotifySDKProvider>
              <MusicKitProvider token={appleAccessToken}>
                <SettingsContext.Consumer>
                  {([{ colorScheme }]) => (
                    <ThemeProvider theme={getThemeConstants(colorScheme)}>
                      <GlobalStyles />
                      <AudioPlayerProvider>
                        <ViewManager />
                        <AudioControlsDrawer />
                      </AudioPlayerProvider>
                    </ThemeProvider>
                  )}
                </SettingsContext.Consumer>
              </MusicKitProvider>
            </SpotifySDKProvider>
          </ViewContextProvider>
        </SettingsProvider>
      </QueryClientProvider>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </RootContainer>
  );
};

export default memo(AppleMusicApp);
