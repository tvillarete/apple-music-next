import { clearCookie } from "music/api/spotify/utils";
import { SPOTIFY_TOKENS_COOKIE_NAME } from "music/utils/constants/api";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  clearCookie(SPOTIFY_TOKENS_COOKIE_NAME);

  return new Response("Logged out of Spotify", {
    status: 200,
  });
}
