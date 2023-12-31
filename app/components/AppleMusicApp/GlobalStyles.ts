import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    height: 100dvh;
    width: 100vw;
    margin: 0;
    overflow: clip;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${({ theme }) => theme.colors.content.primary};
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    font-feature-settings: "case";
    margin: 0;
    color: ${({ theme }) => theme.colors.content.primary};
  }

  * {
    box-sizing: border-box;
  }
`;
