import { CookieSerializeOptions } from "cookie";
import { cookies } from "next/headers";

export const getSpotifyRedirectUri = () => {
  const isDev = process.env.NODE_ENV === "development";

  const protocol = isDev ? "http" : "https";
  const rootUrl = isDev ? `localhost:3000` : process.env.VERCEL_BASE_URL;

  // Example: http://localhost:3000/music/callback
  return `${protocol}://${rootUrl}/music/callback`;
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

export const generateRandomString = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const setCookie = (name: string, value: unknown) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    path: "/music",
  };

  const nextCookies = cookies();
  nextCookies.set(name, stringValue, options);
};

export const clearCookie = (name: string) => {
  const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    path: "/music",
    maxAge: -1,
  };

  const nextCookies = cookies();
  nextCookies.set(name, "", options);
};
