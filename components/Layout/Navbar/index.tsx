import { Menu } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNavKeyByPathName } from "@/utils/location";
export interface INavBarProps {}
const items = [
  {
    label: <Link href={`/`}>首页</Link>,
    key: "home",
  },
  {
    label: <Link href={`/recruitment`}>招新</Link>,
    key: "recruitment",
  },
  {
    label: <Link href={`/personal`}>个人中心</Link>,
    key: "personal",
  },
];
const Navbar: NextPage = () => {
  const [current, setCurrent] = useState("");
  const router = useRouter();
  useEffect(() => {
    setCurrent(getNavKeyByPathName(router.pathname));
  }, [router.pathname]);
  return (
    <header>
      <Menu selectedKeys={[current]} mode="horizontal" items={items} />
    </header>
  );
};
export default Navbar;
