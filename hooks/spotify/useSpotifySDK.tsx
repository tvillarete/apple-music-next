import { views } from "components/views";
import { useViewContext } from "hooks";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import * as Utils from "utils";
import * as SpotifyUtils from "utils/spotify";
import { useEffectOnce, useSettings } from "..";

export const API_URL = "https://915d-174-127-165-218.ngrok.io";

export interface SpotifySDKState {
  isMounted: boolean;
  spotifyPlayer: Spotify.Player;
  accessToken?: string;
  deviceId?: string;
}

export const SpotifySDKContext = createContext<SpotifySDKState>({} as any);

export type SpotifySDKHook = SpotifySDKState & {
  signIn: () => void;
  signOut: () => void;
};

export const useSpotifySDK = (): SpotifySDKHook => {
  const {
    isSpotifyAuthorized,
    setIsSpotifyAuthorized,
    isAppleAuthorized,
    setService,
  } = useSettings();
  const { showView } = useViewContext();
  const state = useContext(SpotifySDKContext);

  /**
   * Open the Spotify OAuth login page. Once authenticated, the user will be
   * redirected back to the app.
   */
  const signIn = useCallback(() => {
    if (!state.isMounted) {
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
      return;
    }

    if (!isSpotifyAuthorized) {
      window.open(
        `${API_URL}/${Utils.isDev() ? "login_dev" : "login"}`,
        "_self"
      );
    } else {
      setService("spotify");
    }
  }, [isSpotifyAuthorized, setService, showView, state.isMounted]);

  const signOut = useCallback(() => {
    state.spotifyPlayer.disconnect();
    setIsSpotifyAuthorized(false);

    SpotifyUtils.removeExistingTokens();

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
}

export const SpotifySDKProvider = ({ children }: Props) => {
  const { showView, hideView } = useViewContext();
  const { setIsSpotifyAuthorized, setService } = useSettings();
  const [token, setToken] = useState<string>();
  const [deviceId, setDeviceId] = useState<string>();
  const spotifyPlayerRef = useRef<Spotify.Player | undefined>();
  const [isMounted, setIsMounted] = useState(false);

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
    const { accessToken, refreshToken, isNew } = await SpotifyUtils.getTokens();
    setIsMounted(true);

    if (accessToken && refreshToken) {
      setToken(accessToken);

      const player = new window.Spotify.Player({
        name: "Music.js",
        getOAuthToken: async (cb: (token: string) => void) => {
          const { storedAccessToken } = SpotifyUtils.getExistingTokens();

          if (!storedAccessToken) {
            console.error("ERROR: Didn't find stored access token");
            return;
          }

          cb(storedAccessToken);
        },
      });

      player.addListener("ready", ({ device_id }: any) => {
        console.log({ device_id });
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
        SpotifyUtils.removeExistingTokens();
      });

      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.connect();

      spotifyPlayerRef.current = player;

      /** The user has just signed in; configure the app to use Spotify. */
      if (isNew) {
        setService("spotify");
      }
    }
  }, [handleUnsupportedAccountError, setIsSpotifyAuthorized, setService]);

  useEffectOnce(() => {
    window.onSpotifyWebPlaybackSDKReady = handleConnectToSpotify;
  });

  return (
    <SpotifySDKContext.Provider
      value={{
        spotifyPlayer: spotifyPlayerRef.current ?? ({} as Spotify.Player),
        accessToken: token,
        deviceId,
        isMounted,
      }}
    >
      {children}
    </SpotifySDKContext.Provider>
  );
};

export default memo(SpotifySDKProvider);
