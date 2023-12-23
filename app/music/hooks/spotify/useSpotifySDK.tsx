import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useInterval, useViewContext } from "music/hooks";
import * as SpotifyUtils from "music/utils/spotify";

import { useSettings } from "..";
import { views } from "music/components/views";
import { API_URL } from "music/utils/constants/api";

export interface SpotifySDKState {
  isPlayerConnected: boolean;
  spotifyPlayer: Spotify.Player;
  accessToken?: string;
  deviceId?: string;
}

export const SpotifySDKContext = createContext<SpotifySDKState>({} as any);

export type SpotifySDKHook = SpotifySDKState & {
  signIn: () => void;
  signOut: () => void;
};

export type SpotifySDKHookProps = {
  onAuthorizationChanged?: (isAuthorized: boolean) => void;
};

export const useSpotifySDK = ({
  onAuthorizationChanged,
}: SpotifySDKHookProps = {}): SpotifySDKHook => {
  const {
    isSpotifyAuthorized,
    setIsSpotifyAuthorized,
    isAppleAuthorized,
    setService,
  } = useSettings();
  const { showView } = useViewContext();
  const state = useContext(SpotifySDKContext);

  const authorizationChangedRef = useRef(onAuthorizationChanged);

  useEffect(() => {
    authorizationChangedRef.current = onAuthorizationChanged;
  }, [onAuthorizationChanged]);

  useEffect(() => {
    authorizationChangedRef.current?.(isSpotifyAuthorized);
  }, [isSpotifyAuthorized]);

  /**
   * Open the Spotify OAuth login page. Once authenticated, the user will be
   * redirected back to the app.
   */
  const signIn = useCallback(async () => {
    if (!isSpotifyAuthorized) {
      const res = await fetch(`${API_URL}/spotify/login`);
      const spotifyLoginUrl = (await res.json()).message;

      window.open(spotifyLoginUrl, "_self");
    } else if (!state.isPlayerConnected) {
      showView({
        type: "popup",
        id: views.spotifyNotSupportedPopup.id,
        title: views.spotifyNotSupportedPopup.title,
        description: "Spotify was unable to mount on this browser :(",
        listOptions: [
          {
            type: "action",
            label: "Okay 😞",
            onSelect: () => {},
          },
        ],
      });
    } else {
      setService("spotify");
    }
  }, [isSpotifyAuthorized, setService, showView, state.isPlayerConnected]);

  const signOut = useCallback(async () => {
    state.spotifyPlayer.disconnect();
    setIsSpotifyAuthorized(false);

    await SpotifyUtils.logOutSpotify();

    // Change to apple music if available.
    if (isAppleAuthorized) {
      setService("apple");
    } else {
      setService(undefined);
    }
  }, [
    isAppleAuthorized,
    setIsSpotifyAuthorized,
    setService,
    state.spotifyPlayer,
  ]);

  return {
    ...state,
    signIn,
    signOut,
  };
};

interface Props {
  children: React.ReactNode;
  initialAccessToken?: string;
  refreshToken?: string;
}

export const SpotifySDKProvider = ({
  children,
  initialAccessToken,
  refreshToken,
}: Props) => {
  const { showView, hideView } = useViewContext();
  const { setIsSpotifyAuthorized, setService } = useSettings();
  const [deviceId, setDeviceId] = useState<string>();
  const spotifyPlayerRef = useRef<Spotify.Player | undefined>();
  const [isPlayerConnected, setIsMounted] = useState(false);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(
    initialAccessToken
  );

  const handleUnsupportedAccountError = useCallback(() => {
    showView({
      type: "popup",
      id: views.spotifyNonPremiumPopup.id,
      title: "Unable to sign in",
      description:
        "Spotify requires a Premium account to play music on the web",
      listOptions: [
        {
          type: "action",
          label: "Okay 😞",
          onSelect: hideView,
        },
      ],
    });
  }, [hideView, showView]);

  /** Fetch access tokens and, if successful, then set up the playback sdk. */
  const handleConnectToSpotify = useCallback(async () => {
    setIsMounted(true);

    if (accessToken) {
      const player = new window.Spotify.Player({
        name: "Music.js",
        getOAuthToken: async (cb) => {
          if (!accessToken) {
            console.error(
              "handleConnectToSpotify: Access token was not provided"
            );
            return;
          }

          cb(accessToken);
        },
      });

      player.addListener("ready", ({ device_id }: any) => {
        console.log(`Spotify Player is connected with ID: ${device_id}`);
        setDeviceId(device_id);
        setIsSpotifyAuthorized(true);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(`Spotify authentication error: ${message}`);
        setIsSpotifyAuthorized(false);
      });

      /** This indicates that the user is using an unsupported account tier. */
      player.addListener("account_error", () => {
        handleUnsupportedAccountError();
        setIsSpotifyAuthorized(false);

        SpotifyUtils.logOutSpotify();
      });

      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.connect();

      spotifyPlayerRef.current = player;
    }
  }, [handleUnsupportedAccountError, setIsSpotifyAuthorized, accessToken]);

  const handleRefreshTokens = useCallback(async () => {
    const { accessToken: updatedAccessToken } =
      await SpotifyUtils.getRefreshedSpotifyTokens(refreshToken);

    console.log(`Refreshed access token: ${updatedAccessToken}`);

    setAccessToken(updatedAccessToken);
  }, [refreshToken]);

  // Refresh the access token every 55 minutes.
  useInterval(handleRefreshTokens, 3500000, !accessToken);

  useEffect(() => {
    if (isSdkReady && typeof accessToken === "string" && !isPlayerConnected) {
      handleConnectToSpotify();
    }
  }, [handleConnectToSpotify, isSdkReady, accessToken, isPlayerConnected]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => setIsSdkReady(true);
  }, []);

  return (
    <SpotifySDKContext.Provider
      value={{
        spotifyPlayer: spotifyPlayerRef.current ?? ({} as Spotify.Player),
        accessToken,
        deviceId,
        isPlayerConnected,
      }}
    >
      {children}
    </SpotifySDKContext.Provider>
  );
};
