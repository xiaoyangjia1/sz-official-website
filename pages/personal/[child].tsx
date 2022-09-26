import { Card, Tabs } from "antd";
import { getLocalStorage } from "@/utils/auth";
import styles from "./personal.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
import axios from "axios";
const Personal = ({ data }: any) => {
  const router = useRouter();
  const { child } = router.query;
  const [activeKey, setActiveKey] = useState("1");
  useEffect(() => {
    let admin_token = getLocalStorage("admin_token");
    if (!admin_token) {
      router.push("/login");
    }
  });
  useEffect(() => {
    child === "application" ? setActiveKey("1") : setActiveKey("2");
  }, [child]);
  let items = [
    {
      label: "我的进度",
      key: "1",
      children: <Application />,
    },
    {
      label: "我的简历",
      key: "2",
      children: <Resume />,
    },
  ];
  const onChange = (key: string) => {
    if (key === "1") {
      router.push("/personal/application");
    } else {
      router.push("/personal/resume");
    }
  };
  return (
    <div className="personal contentCommon">
      <Card
        title={
          <div>
            <p> Hi,qx</p>
            <p>欢迎参加数智工作室校园招新</p>
          </div>
        }
      ></Card>
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        defaultActiveKey="1"
        type="card"
        items={items}
      />
    </div>
  );
};
// export async function getStaticProps({ params }: any) {
//   console.log(params);
//   const res = await fetch("http://127.0.0.1:3000/api/getResume");
//   // const data = await res.json()
//   return {
//     props: {
//       data:{name: 'yqx'},
//     },
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { child: "application" } },
//       { params: { child: "resume" } }, // See the "paths" section below
//     ],
//     fallback: true,
//   };
// }
export default Personal;
