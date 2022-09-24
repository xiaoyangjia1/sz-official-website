import {
  message,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Tabs,
  Upload,
  Affix,
  Table,
  Steps,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getLocalStorage } from "@/utils/auth";
import styles from "./personal.module.scss";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getLocationOrigin } from "next/dist/shared/lib/utils";
import Router, { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
const MyResume = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const [bottom, setBottom] = useState(10);
  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
      >
        <Card title={<h3>个人信息</h3>} extra={<Button>编辑</Button>}>
          {/* <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        > */}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group value={1}>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="学校"
            name="university"
            rules={[{ required: true, message: "请选择学校!" }]}
          >
            <Select>
              <Select.Option value="广东工业大学">广东工业大学</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="学院"
            name="college"
            rules={[{ required: true, message: "请输入学院全称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="专业-班级"
            name="major"
            rules={[{ required: true, message: "请输入专业全称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="学号"
            name="sid"
            rules={[{ required: true, message: "请输入学号!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="微信"
            name="wechat"
            rules={[{ required: true, message: "请输入微信!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="照片"
            valuePropName="fileList"
            rules={[{ required: true, message: "请上传照片!" }]}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          {/* </Form> */}
        </Card>
        <Card title={<h3>校园生活</h3>} extra={<Button>编辑</Button>}>
          {/* <Form
          labelCol={{
            span: 4,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        > */}
          <Form.Item
            label="学习情况"
            name="learning"
            rules={[{ required: true, message: "请填写学习情况!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="校园生活"
            name="university_life"
            rules={[{ required: true, message: "请填写校园生活!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {/* </Form> */}
        </Card>
        <Card title={<h3>作品附件</h3>} extra={<Button>编辑</Button>}>
          {/* <Form
          labelCol={{
            span: 4,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        > */}
          <Form.Item label="作品链接" name="link">
            <Input />
          </Form.Item>
          <Form.Item>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
          {/* </Form> */}
        </Card>
        <Affix offsetBottom={bottom}>
          <div className="operation">
            <Button size="large" type="primary" shape="round" htmlType="submit">
              保存简历
            </Button>
            <Button size="large" type="primary" shape="round">
              预览
            </Button>
          </div>
        </Affix>
      </Form>
    </div>
  );
};
const MyProgress = () => {
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
const Personal = () => {
  const router = useRouter();
  useEffect(() => {
    let admin_token = getLocalStorage("admin_token");
    if (!admin_token) {
      router.push("/login");
    }
  });
  let items = [
    {
      label: "我的进度",
      key: "1",
      children: <MyProgress />,
    },
    {
      label: "我的简历",
      key: "2",
      children: <MyResume />,
    },
  ];
  return (
    <div className="personal contentCommon">
      <Card
        title={
          <div>
            <p> Hi,qx</p>
            <p>欢迎参加数智工作室校园招新</p>
          </div>
        }
      ></Card>
      <Tabs defaultActiveKey="1" type="card" items={items} />
    </div>
  );
};

export default Personal;
