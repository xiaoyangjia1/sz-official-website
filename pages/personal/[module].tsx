import { Card, Tabs } from "antd";
import styles from "./personal.module.scss";
import router, { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
import { NextPage } from "next";
import { store } from "@/app/store";
import { selectEmail, selectToken } from "@/app/reducer/userSlice";
import useSWR from "swr";
const fetcher = async ({ token, email }: any) => {
  const res1 = await fetch("/api/getDeliveredJob", {
    method: "POST",
    body: JSON.stringify({
      token,
      email,
    }),
  });
  const res2 = await fetch("/api/getResume", {
    method: "POST",
    body: JSON.stringify({
      token,
      email,
    }),
  });
  const applicationData = await res1.json();
  const resumeData = await res2.json();
  if (res1.status !== 200) {
    throw new Error(applicationData.message);
  }
  if (res2.status !== 200) {
    throw new Error(resumeData.message);
  }
  return {
    applicationData,
    resumeData,
  };
};
const Personal: NextPage = () => {
  const state = store.getState();
  const { data, error } = useSWR(
    {
      token: selectToken(state),
      email: selectEmail(state),
    },
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;
  const { applicationData, resumeData } = data;
  const { query } = useRouter();
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
