import { Button, Card } from "antd";
import styles from "./position.module.scss";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { store } from "@/app/store";
import useSWR from "swr";
import { selectEmail, selectToken } from "@/app/reducer/userSlice";
import { formatDate } from "@/utils/date";
import { useState } from "react";
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

const Position: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const { query } = useRouter();
  const { pid } = query;
  const state = store.getState();
  const token = selectToken(state);
  const { data: positionData, error } = useSWR(
    {
      api: `getPosition/${pid}`,
      token,
    },
    fetcher
  );
  if (error) return <div>{error.message}</div>;
  if (!positionData) return <div>Loading...</div>;
  const {
    title,
    test,
    interview,
    check1,
    check2,
    batch,
    category,
    desc,
    requirements,
  } = positionData;
  const created_at = formatDate(positionData.created_at);
  const deadline = formatDate(positionData.deadline);
  const handleDeliveryJob = async () => {
    const email = selectEmail(state);
    const res = await fetch("/api/deliveryJob", {
      method: "POST",
      body: JSON.stringify({
        token,
        email,
        pid,
      }),
    });
    if (res.status === 200) {
      setDisabled(true);
    }
  };
  return (
    <div className={styles.position}>
      <Card
        title={<h3>{title}</h3>}
        extra={
          <Button
            type="primary"
            disabled={disabled}
            onClick={handleDeliveryJob}
          >
            {disabled ? "已投递" : "投递简历"}
          </Button>
        }
      ></Card>
      <Card title={<h3>基础信息</h3>}>
        <p>
          <span>发布时间：{created_at}</span>
          <span>截止时间：{deadline}</span>
        </p>
        <p>
          流程：投递简历、{test ? "笔试、" : null}
          {interview ? "面试、" : null}
          {check1 ? "一轮考核、" : null}
          {check2 ? "二轮考核、" : null}offer
        </p>
        <p>
          <span>招新批次：{batch}</span>
          <span>所属类别：研发-{category}</span>
        </p>
        <p>
          <span>招新院校：广东工业大学</span>
          <span>招新对象：大一、大二</span>
        </p>
      </Card>
      <Card title={<h3>职位描述</h3>}>{desc}</Card>
      <Card title={<h3>职位要求</h3>}>{requirements}</Card>
    </div>
  );
};
export default Position;
