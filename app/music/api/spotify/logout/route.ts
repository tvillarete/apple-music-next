import type { NextApiRequest, NextApiResponse } from "next";
import { clearCookie } from "music/api/spotify/utils";
import { SPOTIFY_TOKENS_COOKIE_NAME } from "music/utils/constants/api";

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
  clearCookie(SPOTIFY_TOKENS_COOKIE_NAME);

  return new Response("Logged out of Spotify", {
    status: 200,
  });
}
