import { useCallback, useMemo } from "react";

import { useMusicKit, useSettings, useSpotifySDK, useViewContext } from "hooks";

import SelectableList, {
  SelectableListOption,
  getConditionalOption,
} from "components/SelectableList";
import { getServiceDisplayName } from "utils/service";
import { getColorSchemeDisplayName } from "utils/theme";

export interface SettingsViewProps {}

const SettingsView = ({}: SettingsViewProps) => {
  const {
    service,
    setService,
    isAppleAuthorized,
    isSpotifyAuthorized,
    colorScheme,
    setColorScheme,
  } = useSettings();
  const { isSdkReady: isSpotifySdkReady, signIn: signInSpotify } =
    useSpotifySDK();
  const { signIn: signInApple, isConfigured: isMusicKitReady } = useMusicKit();
  const { showView } = useViewContext();

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

  const handleChooseServiceClick = useCallback(() => {
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

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "action",
        onSelect: handleChooseServiceClick,
        label: "Service",
        contentRight: getServiceDisplayName(service),
      },
      {
        type: "action",
        onSelect: setColorScheme,
        label: "Color scheme",
        contentRight: getColorSchemeDisplayName(colorScheme),
      },
    ],
    [colorScheme, handleChooseServiceClick, service, setColorScheme]
  );

  return <SelectableList options={options} />;
};

export default SettingsView;
