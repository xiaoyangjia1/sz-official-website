import { NextPage } from "next";
import Head from "next/head";
import styles from '@/styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>数智校园招新</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="数智招新官网" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.test}>首页</div>
    </>
  );
};

export default Home;
