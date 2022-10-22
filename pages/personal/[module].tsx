import { Card, Tabs } from "antd";
import styles from "./personal.module.scss";
import router, { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
import { NextPage } from "next";
import useSWR from "swr";

const Personal: NextPage = () => {
  const { query } = useRouter();
  const { data: applicationData, error:err1 } = useSWR(
    "/api/getDeliveredJob",
    async(api)=>{
      const res = await fetch(api);
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      return data
    }
  );
  const { data: resumeData, error:err2 } = useSWR(
    "/api/getResume",
    async(api)=>{
      const res = await fetch(api);
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      return data
    }
  );
  if (err1||err2) return <div>{err1}{err2}</div>;
  if (!applicationData||!resumeData) return <div>Loading...</div>;
  const { module } = query;
  const activeKey = module === "application" ? "1" : "2";
  const items = [
    {
      label: "我的进度",
      key: "1",
      children: <Application applicationData={applicationData} />,
    },
    {
      label: "我的简历",
      key: "2",
      children: <Resume resumeData={resumeData} />,
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
    <>
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
    </>
  );
};

export default Personal;
