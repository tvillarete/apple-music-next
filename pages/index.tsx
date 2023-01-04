import { memo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SettingsProvider } from "hooks";
import Script from "next/script";
import { AppleMusicApp } from "components/AppleMusicApp";
import styles from "../styles/Home.module.css";

type Props = {
  spotifyAccessToken: string;
  appleAccessToken: string;
  spotifyRefreshToken: string;
};

const Home: NextPage<Props> = ({
  appleAccessToken,
  spotifyAccessToken,
  spotifyRefreshToken,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="iOS Music app built for the web" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="iPod.js" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Apple Music for the web" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/21055469/71636084-6081a800-2be0-11ea-98ee-9599a3396c84.png"
        />
        <meta property="og:url" content="http://tannerv.com/music" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>iPod.js</title>
      </Head>
      <main className={styles.main}>
        <SettingsProvider>
          <AppleMusicApp
            spotifyAccessToken={spotifyAccessToken}
            spotifyRefreshToken={spotifyRefreshToken}
            appleAccessToken={appleAccessToken}
          />
        </SettingsProvider>
      </main>
      <Script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js" />
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appleAccessToken =
    process.env.APPLE_DEVELOPER_TOKEN ?? context.query.token ?? null;
  const spotifyTokens = context.req.cookies["spotify-tokens"];
  const [spotifyAccessToken = null, spotifyRefreshToken = null] =
    spotifyTokens?.split(",") ?? [];

  return {
    props: { spotifyAccessToken, appleAccessToken, spotifyRefreshToken },
  };
};

export default memo(Home);
