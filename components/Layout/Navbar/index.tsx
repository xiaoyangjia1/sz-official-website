import { Button, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNavKeyByPathName } from "@/utils/location";
const Navbar = () => {
  const [current, setCurrent] = useState<string>("home");
  const router = useRouter();
  const [loginBtnText, setLoginBtnText] = useState<string>(
    ""
  );
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
      label: <Link href={`/personal/application`}>个人中心</Link>,
      key: "personal",
    },
  ];
  useEffect(() => {
    setCurrent(getNavKeyByPathName(router.pathname));
  }, [router.pathname]);
  useEffect(() => {
    judgeLogin()
  });
  const judgeLogin=async()=>{
    const res = await fetch("/api/judgeLogin");
    const {loggedIn}=await res.json()
    setLoginBtnText(loggedIn ? "登出" : "登录");
  }
  const handleLogin = async () => {
    if (loginBtnText === "登出") {
      const res = await fetch("/api/logout");
      router.push("/");
    } else {
      router.push("/login");
    }
  };
  return (
    <header>
      <Menu selectedKeys={[current]} mode="horizontal" items={items} />
      <Button type="primary" onClick={handleLogin}>
        {loginBtnText}
      </Button>
    </header>
  );
};
export default Navbar;
