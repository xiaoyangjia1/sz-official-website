import styles from "./authForm.module.scss";
import { Button, Col, Form, Input, Row } from "antd";
import router from "next/router";
import Link from "next/link";
import { useState } from "react";
const AuthForm = ({title,api}: any) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(60);
  const onRegister = async (values: any) => {
    const res = await fetch(`/api/${api}`, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        captcha: values.captcha,
      }),
    });
    if (res.status === 200) {
      router.push("/personal/application");
    }
  };
  const onRegisterFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleGetCaptcha = async () => {
    form
      .validateFields(["email"])
      .then(async ({ email }: any) => {
        setDisabled(true);
        let second = 60;
        const timerId = setInterval(() => {
          setSecond(--second);
          if (second === 0) {
            clearInterval(timerId);
            setDisabled(false);
            setSecond(60);
          }
        }, 1000);
        const result = await fetch("/api/getCaptcha", {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="pageWarp">
      <Link href="/login">
        <a className={styles.title}> &lt; {title}</a>
      </Link>
      <Form
        form={form}
        name="basic"
        wrapperCol={{ offset: 6, span: 13 }}
        onFinish={onRegister}
        onFinishFailed={onRegisterFailed}
        size="large"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              pattern:
                /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: "邮箱格式错误",
            },
          ]}
        >
          <Input placeholder="输入邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          extra="密码需要是大写字母、小写字母、数字和特殊符号的组合，长度至少8位。"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}/,
              message: "密码格式错误",
            },
          ]}
        >
          <Input.Password placeholder="设置密码" />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "请输入验证码",
                  },
                ]}
              >
                <Input placeholder="输入验证码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button onClick={handleGetCaptcha} disabled={disabled}>
                {disabled ? `${second}后重新发送` : "获取验证码"}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AuthForm;
