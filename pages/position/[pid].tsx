import { Button, Card, message, Modal, Spin } from "antd";
import styles from "./position.module.scss";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { getCookie } from "cookies-next";
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
  console.log(err1,err2)
  if (err1 || err2) {
    message.error("岗位加载失败");
    return <></>;
  }
  if (!positionData || !queryData || positionData.deadline === "") {
    return (
      <div className="pageWarp">
        <Spin size="large" />
      </div>
    );
  }
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
    const token = getCookie("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    const isPerfectedResume = getCookie("isPerfectedResume");
    if (!isPerfectedResume) {
      Modal.warning({
        title: "简历未完善",
        content: "请先完善简历再投递",
        okText: "完善简历",
        onOk: () => {
          router.push("/personal/resume");
        },
      });
      return;
    }

    const deliveredInfo = JSON.parse(getCookie("deliveredInfo") as string);
    if (deliveredInfo[batch] && deliveredInfo[batch] >= 1) {
      Modal.warning({
        title: "投递超过次数",
        content: `你在${batch}批次已投递${deliveredInfo[batch]}个岗位，达次数上限，不可再投递该批次`,
        okText: "知道啦",
      });
      return;
    } else {
      Modal.warning({
        title: "投递提醒",
        content: (
          <div>
            <p>同一批次只能投递一个岗位，是否投递</p>
            <p style={{ color: "#40a9ff" }}>
              {batch}-{category}-{title}
            </p>
          </div>
        ),
        okText: "确认投递",
        onOk: deliveryJob,
        closable: true,
      });
    }
  };
  const deliveryJob = async () => {
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
      message.success("投递成功");
      router.push("/personal/application");
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
