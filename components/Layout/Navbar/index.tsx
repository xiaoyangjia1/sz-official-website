import { Button, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNavKeyByPathName } from "@/utils/location";
import styles from "./navbar.module.scss";
const Navbar = () => {
  const [current, setCurrent] = useState<string>("home");
  const router = useRouter();
  const [loginBtnText, setLoginBtnText] = useState<string>("");
  useEffect(() => {
    setCurrent(getNavKeyByPathName(router.pathname));
  }, [router.pathname]);
  useEffect(() => {
    judgeLogin();
  });
  const judgeLogin = async () => {
    const res = await fetch("/api/judgeLogin");
    const { loggedIn } = await res.json();
    setLoginBtnText(loggedIn ? "登出" : "登录");
  };
  const handleLogin = async () => {
    if (loginBtnText === "登出") {
      const res = await fetch("/api/logout");
      setLoginBtnText("登录");
    }
  };
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
      label: (
        <Link
          href={loginBtnText === "登出" ? "/personal/application" : "/login"}
        >
          个人中心
        </Link>
      ),
      key: "personal",
    },
    {
      label: (
        <Link href={loginBtnText === "登出" ? "/" : "/login"}>
          <Button type="link" onClick={handleLogin}>
            {loginBtnText}
          </Button>
        </Link>
      ),
      key: "login",
    },
  ];
  return (
    <header
      className={current === "home" ? `${styles.homeHeader} homeHeader` : ""}
    >
      <Link href="/">
        <>
          <Image
            src={current === "home" ? "/logo1.svg" : "/logo2.svg"}
            alt="图片失效"
            priority={true}
            width={250}
            height={50}
          />
        </>
      </Link>
      <Menu selectedKeys={[current]} mode="horizontal" items={items} />
    </header>
  );
};
export default Navbar;
