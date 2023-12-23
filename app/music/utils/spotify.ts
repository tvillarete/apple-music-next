import { API_URL } from "music/utils/constants/api";

export type TokenResponse = {
  accessToken?: string;
  refreshToken?: string;
};

export const getRefreshedSpotifyTokens = async (
  refreshToken?: string
): Promise<TokenResponse> => {
  const emptyReturnValue = {
    accessToken: undefined,
    refreshToken: undefined,
  };

  if (!refreshToken) {
    console.error("getRefreshedSpotifyTokens: No stored refresh token found");

    return emptyReturnValue;
  }

  try {
    const response = await fetch(
      `${API_URL}/spotify/refresh_token?refresh_token=${refreshToken}`,
      {
        credentials: "same-origin",
        mode: "cors",
      }
    );

    const { accessToken } = await response.json();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error fetching refresh token:", { error });
  }

  return emptyReturnValue;
};

export const logOutSpotify = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/spotify/logout`);
  } catch (error) {
    console.error("Error logging out:", { error });
  }
};
