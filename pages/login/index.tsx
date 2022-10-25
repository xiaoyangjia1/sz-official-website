import { NextPage } from "next";
import styles from "./login.module.scss";
import { Button, Form, Input } from "antd";
import router from "next/router";
import Link from "next/link";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
const Login: NextPage = () => {
  const onLogin = async (values: any) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    if (res.status === 200) {
      router.push("/personal/application");
    }
  };
  const onLoginFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.loginWarp}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          email: "3417982712@qq.com",
          password: "200",
        }}
        onFinish={onLogin}
        onFinishFailed={onLoginFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      没有邮箱账号？
      <Link href={`/register`}>
        <Button type="link">创建账号</Button>
      </Link>
    </div>
  );
};
export default Login;
