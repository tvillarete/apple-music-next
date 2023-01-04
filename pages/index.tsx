import { AppleMusicApp } from "components/AppleMusicApp";
import { SettingsProvider } from "hooks";
import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apple Music.js</title>
        <meta name="description" content="iOS Music app, built for the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SettingsProvider>
          <AppleMusicApp />
        </SettingsProvider>
      </main>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </div>
  );
};

export default Home;
