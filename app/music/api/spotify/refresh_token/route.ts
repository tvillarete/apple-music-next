import axios from "axios";
import { setCookie } from "music/api/spotify/utils";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_TOKENS_COOKIE_NAME,
} from "music/utils/constants/api";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url ?? "");
  const urlSearchParams = new URLSearchParams(url.search);
  const refreshToken = urlSearchParams.get("refresh_token");

  if (!refreshToken) {
    return new Response("refresh_token param was not provided", {
      status: 400,
    });
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const base64EncodedAuthorizationHeader = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization: `Basic ${base64EncodedAuthorizationHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    if (accessToken) {
      setCookie(SPOTIFY_TOKENS_COOKIE_NAME, accessToken);

      return new Response(JSON.stringify(response), {
        status: 200,
      });
    }

    return new Response(`Unable to refresh access token`, {
      status: 500,
    });
  } catch (error) {
    return new Response(`Could not refresh token: ${error}`, {
      status: 500,
    });
  }
}
