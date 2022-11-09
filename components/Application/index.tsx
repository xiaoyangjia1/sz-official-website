import { formatDate } from "@/utils/date";
import { Card, Table, Steps, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import request from "@/utils/request";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { getStatusClassNames } from "antd/lib/_util/statusUtils";
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
const UploadFile = ({ applicationItem, status }: any) => {
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
    const { error_code } = result;
    if (error_code === 0) {
      message.success("上传文件成功");
      getUploadedFile("/api/getUploadedFile");
    } else {
      message.error("上传文件失败");
    }
  };

  return (
    <Table
      pagination={false}
      style={{ marginTop: "20px" }}
      columns={fileColumns}
      dataSource={fileData}
      footer={() => {
        return status ? (
          <form method="post" encType="multipart/form-data">
            <input type="file" multiple onChange={(e) => handleUpload(e)} />
          </form>
        ) : null;
      }}
    />
  );
};
const StepsComponent = ({ el }: any) => {
  const { Step } = Steps;
  const { test, interview, check1, check2, offer } = el;
  const getStatus = (status: number) => {
    return status === 1 ? "wait" : status === 2 ? "finish" : "error";
  };
  const getDescription = (status: number) => {
    return status === 2 ? "通过" : status === 3 ? "未通过" : "";
  };
  const titleArr = [
    { status: test, title: "笔试" },
    { status: interview, title: "面试" },
    { status: check1, title: "一轮考核" },
    { status: check2, title: "二轮考核" },
    { status: offer, title: "Offer" },
  ];
  const stepList = titleArr.filter((el) => {
    return !!el.status;
  });
  return (
    <Steps>
      <Step status="finish" title="投递简历" description="完成" />
      {stepList.map((el) => {
        return (
          <Step
            key={el.title}
            status={getStatus(el.status)}
            title={el.title}
            description={getDescription(el.status)}
          />
        );
      })}
    </Steps>
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
  const getStatus = (steps: number[]) => {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] === 3) {
        return 0;
      }
    }
    return 1;
  };
  const data: DeliveryItem[] = applicationData.map((el: any) => {
    const status = getStatus([
      el.test,
      el.interview,
      el.check1,
      el.check2,
      el.offer,
    ]);
    return {
      key: el.pid,
      pid: <Link href={`/position/${el.pid}`}>{el.pid}</Link>,
      batch: el.batch,
      category: el.category,
      title: el.title,
      status,
      applyTime: formatDate(el.created_at),
      step: <StepsComponent el={el} />,
      uploadFile: <UploadFile applicationItem={el} status={status} />,
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
              <div style={{ padding: "20px" }}>
                {record.step}
                {record.uploadFile}
              </div>
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
