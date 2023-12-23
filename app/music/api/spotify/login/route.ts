import { SPOTIFY_CLIENT_ID } from "music/utils/constants/api";
import {
  generateRandomString,
  getSpotifyRedirectUri,
} from "music/api/spotify/utils";

export async function GET() {
  const scope =
    "user-read-private user-read-email user-library-read user-follow-read playlist-read-collaborative playlist-read-private streaming user-read-playback-state user-read-currently-playing user-modify-playback-state";

  const spotify_redirect_uri = getSpotifyRedirectUri();
  const spotify_client_id = SPOTIFY_CLIENT_ID;
  const state: string = generateRandomString(16);

  if (!spotify_redirect_uri || !spotify_client_id) {
    const errorMessage =
      "Missing Spotify redirect URI. Check that the Vercel ENV variables have ben properly initialized.";
    return new Response(errorMessage, {
      status: 400,
    });
  }

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  }).toString();

  return new Response(
    JSON.stringify({
      message: `https://accounts.spotify.com/authorize/?${authParams}`,
    }),
    {
      status: 200,
    }
  );
}
