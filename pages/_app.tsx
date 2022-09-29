import "antd/dist/antd.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, ILayoutProps } from "@/components/Layout";
import Head from "next/head";
function MyApp({
  Component,
  pageProps,
  navbarData,
  footerData,
}: AppProps & ILayoutProps) {
  return (
    <>
      <Head>
        <title>数智校园招新</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="数智招新官网" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout navbarData={navbarData} footerData={footerData}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  return {
    props: {
      navbarData: {},
      footerData: {},
    },
  };
}

export default MyApp;
