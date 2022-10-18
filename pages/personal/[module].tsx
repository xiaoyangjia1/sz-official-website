import { Card, Tabs } from "antd";
import styles from "./personal.module.scss";
import router, { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
import { NextPage } from "next";
import { store } from "@/app/store";
import { selectEmail, selectToken } from "@/app/reducer/userSlice";
import useSWR from "swr";
import { useEffect } from "react";
const fetcher = async ({ api, token, email }: any) => {
  const res = await fetch("/api/" + api, {
    method: "POST",
    body: JSON.stringify({
      token,
      email,
    }),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
const Personal: NextPage = () => {
  const { query } = useRouter();
  const {module} = query;
  const api = module === "application" ? "getDeliveredJob" : "getResume";
  const state = store.getState();
  const { data, error } = useSWR(
    {
      api,
      token: selectToken(state),
      email: selectEmail(state),
    },
    fetcher
  );
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data)
  const activeKey = module === "application" ? "1" : "2";
  const items = [
    {
      label: "我的进度",
      key: "1",
      children: <Application applicationData={data} />,
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
