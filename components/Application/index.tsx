import { formatDate } from "@/utils/date";
import { Card, Table, Steps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NextComponentType } from "next";
import { useEffect } from "react";
import styles from "./application.module.scss";
interface DataType {
  key: React.Key;
  pid: string;
  title: string;
  batch: string;
  category: string;
  applyTime: string;
  status: number;
  step: any;
}
const getState = (state: number) => {
  return state === 1 ? "wait" : state === 2 ? "finish" : "error";
};
const Application = ({ applicationData }: any) => {
  const { Step } = Steps;
  const columns: ColumnsType<DataType> = [
    { title: "职位ID", dataIndex: "pid", key: "pid" },
    { title: "批次", dataIndex: "batch", key: "batch" },
    { title: "类别", dataIndex: "category", key: "category" },
    { title: "职位", dataIndex: "title", key: "title" },
    { title: "申请时间", dataIndex: "applyTime", key: "applyTime" },
  ];
  const data: DataType[] = applicationData.map((el: any) => {
    let status = 1;
    const { test, interview, check1, check2, offer } = el;
    if (
      test === 3 ||
      interview === 3 ||
      check1 === 3 ||
      check2 === 3 ||
      offer === 3
    ) {
      status = 0;
    }
    return {
      key: el.pid,
      pid: el.pid,
      batch: el.batch,
      category: el.category,
      title: el.title,
      status,
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
              <div style={{ margin: 0 }}>{record.step}</div>
            ),
          }}
          dataSource={data.filter((el) => {
            return el.status === 1;
          })}
        />
      </Card>
      <Card title={<h3>已结束</h3>}>
        <Table
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ margin: 0 }}>{record.step}</div>
            ),
          }}
          dataSource={data.filter((el) => {
            return el.status === 0;
          })}
        />
      </Card>
    </div>
  );
};
export default Application;
