import { NextPage } from "next";
import styles from "./footer.module.scss";
interface ILink {
  label: string;
  link?: string;
}

interface ILinkList {
  title: string;
  list: ILink[];
}

interface IQRCode {
  image: string;
  text: string;
}
export interface IFooterProps {
  title: string;
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string; // 站点备案号
  publicNumber: string; // 公安备案号
}
const Footer = ({
  title,
  linkList,
  qrCode,
  copyRight,
  siteNumber,
  publicNumber,
}: IFooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.test}>底部</div>
    </footer>
  );
};
export default Footer;
