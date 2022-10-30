import Navbar from "./Navbar";
import Footer from "./Footer";
interface ILayoutProps {
  children: JSX.Element;
}
export const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
};
