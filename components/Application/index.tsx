import { Card,  Table, Steps } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./application.module.scss";

const Application = ({applicationData}:any) => {
  console.log("+++++++++++")
  console.log(applicationData)
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
    { title: "职位", dataIndex: "title", key: "title" },
    { title: "申请时间", dataIndex: "applyTime", key: "applyTime" },
    { title: "当前状态", dataIndex: "status", key: "status" },
  ];
  const data: DataType[] = [
    {
      key: "SZ2023FE",
      pid: "SZ2023FE",
      title: "前端开发",
      applyTime: "2023-3-14",
      status: "一轮考核",
      step: (
        <Steps current={1} status="error">
          <Step title="Finished" description="This is a description" />
          <Step title="In Process" description="This is a description" />
          <Step title="Waiting" description="This is a description" />
        </Steps>
      ),
    },
  ];
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
