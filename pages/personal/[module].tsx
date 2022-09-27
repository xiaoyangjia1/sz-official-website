import { Card, Tabs } from "antd";
import { getLocalStorage } from "@/utils/auth";
import styles from "./personal.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
const Personal = ({ data, module }: any) => {
  console.log("data: ", data);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("1");
  useEffect(() => {
    let admin_token = getLocalStorage("admin_token");
    if (!admin_token) {
      router.push("/login");
    }
  });
  useEffect(() => {
    module === "application" ? setActiveKey("1") : setActiveKey("2");
  }, [module]);
  let items = [
    {
      label: "我的进度",
      key: "1",
      children: <Application />,
    },
    {
      label: "我的简历",
      key: "2",
      children: <Resume resumeData={data} />,
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
export async function getStaticProps({ params }: any) {
  if (params.module === "resume") {
    const res = await fetch("http://127.0.0.1:3000/api/getResume");
    const resumeData = await res.json();
    return {
      props: {
        data: resumeData,
        module: params.module,
      },
    };
  } else {
    return {
      props: {
        data: {},
        module: params.module,
      },
    };
  }
}
export async function getStaticPaths() {
  let modules = ["application", "resume"],
    paths = modules.map((module) => {
      return {
        params: {
          module,
        },
      };
    });

  return {
    paths,
    fallback: false,
  };
}
export default Personal;
