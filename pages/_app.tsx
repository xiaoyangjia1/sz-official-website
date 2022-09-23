import "antd/dist/antd.css";
import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { Layout, ILayoutProps } from "@/components/Layout";
import App from "next/app";

function MyApp({
  Component,
  pageProps,
  navbarData,
  footerData,
}: AppProps & ILayoutProps) {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  return {
    ...pageProps,
    navbarData: {},
    footerData: {},
  };
};
export default MyApp;
