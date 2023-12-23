import * as Theme from "./constants/Theme";

const supportedThemes = {
  silver: "silver",
};

export type DeviceThemeName = keyof typeof supportedThemes;

export const getTheme = (deviceTheme: DeviceThemeName): Theme.DeviceTheme => {
  switch (deviceTheme) {
    default:
      return Theme.Silver;
  }
};
