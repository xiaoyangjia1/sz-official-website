import "antd/dist/antd.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, ILayoutProps } from "@/components/Layout";

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
export async function getStaticProps() {
  return {
    props: {
      navbarData: {},
      footerData: {},
    },
  };
}

export default MyApp;
