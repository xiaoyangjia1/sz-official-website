import { NextPage } from "next";
import styles from "./register.module.scss";
import { Button, Col, Form, Input, Row } from "antd";
import router from "next/router";
import Link from "next/link";
import { useState } from "react";
const Login: NextPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(60);
  const onRegister = async (values: any) => {
    const res = await fetch("/api/register", {
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
    setDisabled(true);
    let second=60
    const timerId = setInterval(() => {
      setSecond(--second);
      if (second === 0) {
        clearInterval(timerId);
        setDisabled(false);
        setSecond(60)
      }
    }, 1000);
    const res = await fetch("/api/getCaptcha", {
      method: "POST",
      body: JSON.stringify({
        email: "y12138_qx@qq.com",
      }),
    });
  };
  return (
    <div className={styles.loginWarp}>
      <Link href="/login"> &lt; 创建账号</Link>
      <Form
        name="basic"
        initialValues={{
          email: "y12138_qx@qq.com",
          password: "Yangqipa2001#",
        }}
        onFinish={onRegister}
        onFinishFailed={onRegisterFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "邮箱格式错误",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "密码格式错误",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Captcha">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
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
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
