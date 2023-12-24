import { AppleMusicApp } from "music/components/AppleMusicApp";
import { SPOTIFY_TOKENS_COOKIE_NAME } from "music/utils/constants/api";
import { cookies } from "next/headers";

export default async function Page() {
  const nextCookies = cookies();

  const appleAccessToken = process.env.APPLE_DEVELOPER_TOKEN ?? "";

  const spotifyTokens = nextCookies.get(SPOTIFY_TOKENS_COOKIE_NAME)?.value;
  const [spotifyAccessToken, spotifyRefreshToken] =
    spotifyTokens?.split(",") ?? [];

  return (
    <AppleMusicApp
      appleAccessToken={appleAccessToken}
      spotifyAccessToken={spotifyAccessToken}
      spotifyRefreshToken={spotifyRefreshToken}
    />
  );
}
