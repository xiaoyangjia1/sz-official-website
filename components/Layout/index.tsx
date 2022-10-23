import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./layout.module.scss";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
interface ILayoutProps {
  children: JSX.Element;
}
export const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navbar/>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};
