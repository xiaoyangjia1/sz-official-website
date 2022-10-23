import "antd/dist/antd.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/app/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>数智校园招新</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="数智招新官网" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
export default MyApp;
