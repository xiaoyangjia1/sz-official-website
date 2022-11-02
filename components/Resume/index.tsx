import { message, Button, Card, Form, Input, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import styles from "./resume.module.scss";
const Resume = ({ resumeData }: any) => {
  const onFinish = async (values: any) => {
    const res = await fetch("/api/submitResume", {
      method: "POST",
      body: JSON.stringify({
        college: values.college,
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
  return (
    <Form
      initialValues={{
        name: resumeData.name,
        sex: resumeData.sex,
        university: resumeData.university,
        college: resumeData.college,
        major: resumeData.major,
        sid: resumeData.sid,
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
      <Card title={<h3>个人信息</h3>}>
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
            <Radio value={2}>女</Radio>
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
          label="微信"
          name="wechat"
          rules={[{ required: true, message: "请输入微信!" }]}
        >
          <Input />
        </Form.Item>
      </Card>
      <Card title={<h3>校园生活</h3>}>
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
      <Card title={<h3>作品附件</h3>}>
        <Form.Item label="作品链接" name="link">
          <Input />
        </Form.Item>
      </Card>
        <div className={styles.operation}>
          <Button size="large" type="primary" shape="round" htmlType="submit">
            保存简历
          </Button>
        </div>
    </Form>
  );
};
export default Resume;
