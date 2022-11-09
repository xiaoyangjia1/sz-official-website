import { formatDate } from "@/utils/date";
import { Card, Table, Steps, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import request from "@/utils/request";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
interface DeliveryItem {
  key: React.Key;
  pid: any;
  title: string;
  batch: string;
  category: string;
  applyTime: string;
  status: number;
  step: any;
  uploadFile: any;
}
interface FileItem {
  key: React.Key;
  name: string;
  delete: any;
}
const { Step } = Steps;
const getState = (state: number) => {
  return state === 1 ? "wait" : state === 2 ? "finish" : "error";
};
const UploadFile = ({ applicationItem }: any) => {
  const { batch, title, email } = applicationItem;
  const [fileData, setFileData] = useState<FileItem[]>([]);
  const fileColumns: ColumnsType<FileItem> = [
    { title: "文件名", dataIndex: "name", key: "name" },
    { title: "操作", dataIndex: "delete", key: "delete" },
  ];

  const deleteUploadedFile = async (name: string) => {
    const res = await fetch("/api/deleteUploadedFile", {
      method: "POST",
      body: JSON.stringify({
        batch,
        title,
        email,
        name,
      }),
    });
    if (res.status === 200) {
      message.success("删除文件成功");
      getUploadedFile("/api/getUploadedFile");
    } else {
      message.error("删除文件失败");
    }
  };
  const getUploadedFile = async (api: string) => {
    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify({
        batch,
        title,
        email,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      message.error("获取上传文件列表失败");
      return;
    } else {
      const newFileData = !data
        ? []
        : data.map((el: string, index: number) => {
            return {
              key: index,
              name: el,
              delete: (
                <Button
                  type="link"
                  style={{ padding: "0" }}
                  onClick={() => deleteUploadedFile(el)}
                >
                  删除
                </Button>
              ),
            };
          });
      setFileData(newFileData);
    }
  };
  useSWR("/api/getUploadedFile", getUploadedFile);

  const handleUpload = async (e: any) => {
    let formData = new FormData();
    const files = e.target.files;
    formData.append("file", files[0]);
    formData.append("batch", batch);
    formData.append("title", title);
    formData.append("email", email);
    message.warning("上传过程中请勿刷新浏览器");
    const { data: result } = await request({
      url: "/uploadFile",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { error_code, data } = result;
    if (error_code === 0) {
      message.success("上传文件成功");
      getUploadedFile("/api/getUploadedFile");
    } else {
      message.error("上传文件失败");
    }
  };

  return (
    <Table
      style={{ marginTop: "20px" }}
      columns={fileColumns}
      dataSource={fileData}
      footer={() => (
        <form method="post" encType="multipart/form-data">
          <input type="file" multiple onChange={(e) => handleUpload(e)} />
        </form>
      )}
    />
  );
};
const Application = ({ applicationData }: any) => {
  const columns: ColumnsType<DeliveryItem> = [
    { title: "职位ID", dataIndex: "pid", key: "pid" },
    { title: "批次", dataIndex: "batch", key: "batch" },
    { title: "类别", dataIndex: "category", key: "category" },
    { title: "职位", dataIndex: "title", key: "title" },
    { title: "申请时间", dataIndex: "applyTime", key: "applyTime" },
  ];
  const data: DeliveryItem[] = applicationData.map((el: any) => {
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
      pid: <Link href={`/position/${el.pid}`}>{el.pid}</Link>,
      batch: el.batch,
      category: el.category,
      title: el.title,
      status,
      applyTime: formatDate(el.created_at),
      step: (
        <Steps>
          <Step status="finish" title="投递简历" description="完成" />
          {el.test ? (
            <Step
              status={getState(el.test)}
              title="笔试"
              description={
                el.test === 2 ? "通过" : el.test === 3 ? "未通过" : ""
              }
            />
          ) : null}
          {el.interview ? (
            <Step
              status={getState(el.interview)}
              title="面试"
              description={
                el.interview === 2 ? "通过" : el.interview === 3 ? "未通过" : ""
              }
            />
          ) : null}
          {el.check1 ? (
            <Step
              status={getState(el.check1)}
              title="一轮考核"
              description={
                el.check1 === 2 ? "通过" : el.check1 === 3 ? "未通过" : ""
              }
            />
          ) : null}
          {el.check2 ? (
            <Step
              status={getState(el.check2)}
              title="二轮考核"
              description={
                el.check2 === 2 ? "通过" : el.check2 === 3 ? "未通过" : ""
              }
            />
          ) : null}
          <Step status={getState(el.offer)} title="Offer" />
        </Steps>
      ),
      uploadFile: <UploadFile applicationItem={el} />,
    };
  });
  return (
    <>
      <Card title={<h3>进行中</h3>}>
        <Table
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: "20px" }}>
                {record.step}
                {record.uploadFile}
              </div>
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
    </>
  );
};
export default Application;
