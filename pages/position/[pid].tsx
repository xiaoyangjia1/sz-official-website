import { Button, Card, Spin } from "antd";
import styles from "./position.module.scss";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import { fetcher } from "@/utils/fetcher";
const Position: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { pid } = router.query;
  const { data: positionData, error: err1 } = useSWR(
    `/api/getPosition/${pid}`,
    fetcher
  );
  const { data: queryData, error: err2 } = useSWR(
    `/api/queryIsDelivered/${pid}`,
    async (api) => {
      const data = await fetcher(api);
      setDisabled(data.disabled);
      return data;
    }
  );
  if (err1 || err2)
    return (
      <div>
        {err1?.message}
        {err2?.message}
      </div>
    );
  if (!positionData || !queryData)
    return (
      <div className="pageWarp">
        <Spin size="large" />
      </div>
    );
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
    const res = await fetch("/api/deliveryJob", {
      method: "POST",
      body: JSON.stringify({
        pid,
      }),
    });
    if (res.status === 401) {
      router.push("/login");
    }
    if (res.status === 200) {
      setDisabled(true);
    }
  };
  return (
    <div className={`${styles.position} pageContent`}>
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
        bodyStyle={{ display: "none" }}
      ></Card>
      <Card title={<h3>基础信息</h3>}>
        <p>
          <span>
            发布时间：<time dateTime={created_at}>{created_at}</time>
          </span>
          <span>
            截止时间：<time dateTime={deadline}>{deadline}</time>
          </span>
        </p>
        <p>
          <span>招新批次：{batch}</span>
          <span>所属类别：{category}</span>
        </p>
        <>
          流程：投递简历、{test ? "笔试、" : null}
          {interview ? "面试、" : null}
          {check1 ? "一轮考核、" : null}
          {check2 ? "二轮考核、" : null}offer
        </>
      </Card>
      <Card title={<h3>职位描述</h3>}>{desc}</Card>
      <Card title={<h3>职位要求</h3>}>{requirements}</Card>
    </div>
  );
};
export default Position;
