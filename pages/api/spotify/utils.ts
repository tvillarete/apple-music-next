import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import { API_URL } from "utils/constants/api";

export const getSpotifyClientId = () => {
  if (process.env.SPOTIFY_CLIENT_ID) {
    return process.env.SPOTIFY_CLIENT_ID;
  } else {
    console.error(
      "Undefined Error: An environment variable - SPOTIFY_CLIENT_ID - is not working properly"
    );
  }
};

export const getSpotifyClientSecret = () => {
  if (process.env.SPOTIFY_CLIENT_SECRET) {
    return process.env.SPOTIFY_CLIENT_SECRET;
  } else {
    console.error(
      "Undefined Error: An environment variable - SPOTIFY_CLIENT_SECRET - is not working properly"
    );
  }
};

export const getSpotifyRedirectUri = (req: NextApiRequest) => {
  const isDev = process.env.NODE_ENV === "development";
  const protocol = req.headers["x-forwarded-proto"];

  const rootUrl = isDev ? `localhost:3000` : process.env.VERCEL_BASE_URL;

  // Example: https://localhost:3000/api/spotify/callback
  return `${protocol}://${rootUrl}${API_URL}/spotify/callback`;
};

export const getSpotifyAuthorizationHeader = (
  clientId?: string,
  clientSecret?: string
) => {
  if (!clientId || !clientSecret) {
    console.error(
      "getSpotifyAuthorizationHeader: clientId or clientSecret is undefined"
    );
  }

  return (
    "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
  );
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    path: "/",
  };

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

export const clearCookie = (res: NextApiResponse, name: string) => {
  const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: -1,
  };

  res.setHeader("Set-Cookie", serialize(name, "", options));
};
