import { message, Button, Card, Form, Input, Radio, Upload, Affix } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import styles from "./resume.module.scss";
import { useState } from "react";
const Resume = ({ resumeData }: any) => {
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const res = await fetch("/api/submitResume", {
      method: "POST",
      body: JSON.stringify({
        college: values.college,
        email: values.email,
        learning: values.learning,
        link: values.link,
        major: values.major,
        name: values.name,
        phone: values.phone,
        sex: values.sex,
        sid: values.sid,
        photo: "222",
        university: values.university,
        university_life: values.university_life,
        wechat: values.wechat,
        files: "111",
      }),
    });
    if (res.status === 200) {
      message.success("简历保存成功");
    }
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
    <Form
      initialValues={{
        name: resumeData.name,
        sex: resumeData.sex,
        university: resumeData.university,
        college: resumeData.college,
        major: resumeData.major,
        sid: resumeData.sid,
        email: resumeData.email,
        phone: resumeData.phone,
        wechat: resumeData.wechat,
        photo: resumeData.photo,
        learning: resumeData.learning,
        link: resumeData.link,
        university_life: resumeData.university_life,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{
        span: 10,
      }}
      layout="horizontal"
    >
      <Card title={<h3>个人信息</h3>} extra={<Button>编辑</Button>}>
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
          rules={[{ required: true, message: "请输入学校全称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学院"
          name="college"
          rules={[{ required: true, message: "请输入学院全称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="专业"
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
      </Card>
      <Card title={<h3>校园生活</h3>} extra={<Button>编辑</Button>}>
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
      </Card>
      <Card title={<h3>作品附件</h3>} extra={<Button>编辑</Button>}>
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
      </Card>
      <Affix offsetBottom={bottom}>
        <div className={styles.operation}>
          <Button size="large" type="primary" shape="round" htmlType="submit">
            保存简历
          </Button>
          <Button size="large" type="primary" shape="round">
            预览
          </Button>
        </div>
      </Affix>
    </Form>
  );
};
export default Resume;
