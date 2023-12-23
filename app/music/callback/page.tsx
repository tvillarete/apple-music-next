"use client";
import { useEffectOnce } from "music/hooks";
import { API_URL, APP_URL } from "music/utils/constants/api";
import { useCallback } from "react";

/**
 * This page is the entry point for the Spotify OAuth callback.
 * The user is redirected here after authenticating with Spotify.
 *
 * We expect a `code` query parameter to be present in the URL, which is used to
 * request an access token from Spotify.
 */
export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const handleCallback = useCallback(async () => {
    const code = searchParams.code;

    try {
      await fetch(`${API_URL}/spotify/callback?code=${code}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      window.location.href = `${APP_URL}?service=spotify`;
    }
  }, [searchParams.code]);

  useEffectOnce(() => {
    handleCallback();
  });

  return <></>;
}
