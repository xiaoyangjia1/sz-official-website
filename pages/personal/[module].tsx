import { Card, Spin, Tabs } from "antd";
import { useRouter } from "next/router";
import Resume from "@/components/Resume";
import Application from "@/components/Application";
import { NextPage } from "next";
import useSWR from "swr";

const Personal: NextPage = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { data: applicationData } = useSWR(
    "/api/getDeliveredJob",
    async (api: string) => {
      const res = await fetch(api);
      const data = await res.json();
      if (res.status !== 200) {
        router.push("/login");
        return;
      }
      return data;
    }
  );
  const { data: resumeData } = useSWR("/api/getResume", async (api: string) => {
    const res = await fetch(api);
    const data = await res.json();
    if (res.status !== 200) {
      router.push("/login");
      return;
    }
    return data;
  });
  if (!applicationData || !resumeData)
    return (
      <div className="pageWarp">
        <Spin size="large" />
      </div>
    );
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
    <div className="pageContent">
      <Card style={{ marginBottom: "20px" }}>
        <div>
          <p>Hi,欢迎参加数智工作室校园招新</p>
        </div>
      </Card>
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        type="card"
        items={items}
      />
    </div>
  );
};

export default Personal;
