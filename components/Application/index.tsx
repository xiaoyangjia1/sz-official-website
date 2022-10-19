import { formatDate } from "@/utils/date";
import { Card, Table, Steps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NextComponentType } from "next";
import styles from "./application.module.scss";
const getState = (state: number) => {
  return state === 1 ? "wait" : state === 2 ? "finish" : "error";
};
const Application: NextComponentType = ({ applicationData }: any) => {
  console.log(applicationData);
  const { Step } = Steps;
  interface DataType {
    key: React.Key;
    pid: string;
    title: string;
    applyTime: string;
    status: string;
    step: any;
  }

  const columns: ColumnsType<DataType> = [
    { title: "职位ID", dataIndex: "pid", key: "pid" },
    { title: "批次", dataIndex: "batch", key: "batch" },
    { title: "类别", dataIndex: "category", key: "category" },
    { title: "职位", dataIndex: "title", key: "title" },
    { title: "申请时间", dataIndex: "applyTime", key: "applyTime" },
  ];
  const data: DataType[] = applicationData.map((el: any) => {
    return {
      key: el.pid,
      pid: el.pid,
      batch: el.batch,
      category: el.category,
      title: el.title,
      applyTime: formatDate(el.created_at),
      step: (
        <Steps>
          <Step status="finish" title="投递简历" description="完成" />
          {el.test ? <Step status={getState(el.test)} title="笔试" /> : null}
          {el.interview ? (
            <Step status={getState(el.interview)} title="面试" />
          ) : null}
          {el.check1 ? (
            <Step status={getState(el.check1)} title="一轮考核" />
          ) : null}
          {el.check2 ? (
            <Step status={getState(el.check2)} title="二轮考核" />
          ) : null}
          <Step status={el.offer ? "finish" : "wait"} title="Offer" />
        </Steps>
      ),
    };
  });
  return (
    <div>
      <Card title={<h3>进行中</h3>}>
        <Table
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.step}</p>
            ),
          }}
          dataSource={data}
        />
      </Card>
      <Card title={<h3>已结束</h3>}></Card>
    </div>
  );
};
export default Application;
