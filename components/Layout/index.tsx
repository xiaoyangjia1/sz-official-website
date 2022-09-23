import Navbar, { INavBarProps } from "./Navbar";
import Footer, { IFooterProps } from "./Footer";
import styles from "./layout.module.scss";
export interface ILayoutProps {
  navbarData: INavBarProps;
  footerData: IFooterProps;
  children: JSX.Element;
}
export const Layout = ({ children, navbarData, footerData }: ILayoutProps) => {
  return (
    <>
      <Navbar {...navbarData} />
      <main className={styles.main}>{children}</main>
      <Footer {...footerData} />
    </>
  );
};
