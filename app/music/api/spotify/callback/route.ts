import axios from "axios";

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_TOKENS_COOKIE_NAME,
} from "music/utils/constants/api";
import { getSpotifyRedirectUri, setCookie } from "music/api/spotify/utils";
import { NextRequest } from "next/server";

type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url ?? "");
  const urlSearchParams = new URLSearchParams(url.search);
  const code = urlSearchParams.get("code");

  if (!code) {
    return new Response("Error: code was not provided in query params", {
      status: 400,
    });
  }

  const spotifyRedirectUri = getSpotifyRedirectUri();

  const base64EncodedAuthorizationHeader = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const options = {
    headers: {
      Authorization: `Basic ${base64EncodedAuthorizationHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post<SpotifyAuthApiResponse>(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code as string,
        redirect_uri: spotifyRedirectUri,
        grant_type: "authorization_code",
      }),
      options
    );

    const { access_token, refresh_token } = response.data;

    if (access_token) {
      setCookie(SPOTIFY_TOKENS_COOKIE_NAME, `${access_token},${refresh_token}`);

      return new Response(JSON.stringify(response.data), {
        status: 200,
      });
    }
  } catch {
    return new Response(
      "Error: Access token was not returned from Spotify API",
      {
        status: 500,
      }
    );
  }
}
