import MusicJsLogo from "components/Icon/icons/MusicJsLogo";
import { getConditionalOption } from "components/SelectableList";
import { useMusicKit, useSettings, useSpotifySDK, useViewContext } from "hooks";
import { useCallback } from "react";
import styled, { useTheme } from "styled-components";
import { getServiceDisplayName } from "utils/service";

const RootContainer = styled.div`
  height: 70dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  width: 90%;
  max-width: 300px;
  font-weight: 400;
`;

const Button = styled.button`
  appearance: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  padding: 14px 20px;
  font-size: 17px;
  border-radius: 12px;
  cursor: pointer;

  &:active {
    filter: brightness(0.9);
  }
`;

export const SigninPrompt = () => {
  const { setService, isAppleAuthorized, isSpotifyAuthorized } = useSettings();
  const { isSdkReady: isSpotifySdkReady, signIn: signInSpotify } =
    useSpotifySDK();
  const { signIn: signInApple, isConfigured: isMusicKitReady } = useMusicKit();
  const { showView } = useViewContext();
  const theme = useTheme();

  const handleSetSpotifyService = useCallback(() => {
    if (!isSpotifyAuthorized) {
      signInSpotify();
    } else {
      setService("spotify");
    }
  }, [isSpotifyAuthorized, setService, signInSpotify]);

  const handleSetAppleService = useCallback(() => {
    if (!isAppleAuthorized) {
      signInApple();
    } else {
      setService("apple");
    }
  }, [isAppleAuthorized, setService, signInApple]);

  const handleSignInClick = useCallback(() => {
    showView({
      type: "popup",
      id: "chooseServicePopup",
      title: "Choose service",
      description: "This will be used for media playback",
      listOptions: [
        ...getConditionalOption(isSpotifySdkReady, {
          type: "action",
          label: getServiceDisplayName("spotify"),
          onSelect: handleSetSpotifyService,
        }),
        ...getConditionalOption(isMusicKitReady, {
          type: "action",
          label: getServiceDisplayName("apple"),
          onSelect: handleSetAppleService,
        }),
        {
          type: "action",
          label: "Cancel",
          onSelect: () => {},
        },
      ],
    });
  }, [
    handleSetAppleService,
    handleSetSpotifyService,
    isMusicKitReady,
    isSpotifySdkReady,
    showView,
  ]);

  return (
    <RootContainer>
      <MusicJsLogo
        // @ts-expect-error This actually works, the prop interface just isn't correct
        color={theme.colors.content.primary}
        width={150}
        height={150}
      />
      <Text>Sign in with Apple Music or Spotify to view this content</Text>
      <Button onClick={handleSignInClick}>Sign in</Button>
    </RootContainer>
  );
};
