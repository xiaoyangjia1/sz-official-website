import { NextPage } from "next";
import styles from "./login.module.scss";
import { Button, Form, Input } from "antd";
import router from "next/router";
import Link from "next/link";
const Login: NextPage = () => {
  const [form] = Form.useForm();
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
    if (res.status === 500) {
      form.setFields([
        { name: "email", errors: ["邮箱或密码错误"] },
        { name: "password", errors: ["邮箱或密码错误"] },
      ]);
    }
  };
  const onLoginFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="pageWarp">
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 100 }}
        onFinish={onLogin}
        onFinishFailed={onLoginFailed}
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
          style={{ marginBottom: "10px" }}
          extra={
            <Link href={"/resetPassword"}>
              <Button type="link" className={styles.toResetPasswordBtn}>
                忘记密码？
              </Button>
            </Link>
          }
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}/,
              message: "密码格式错误",
            },
          ]}
        >
          <Input.Password placeholder="输入密码" />
        </Form.Item>
        <Form.Item
          extra={
            <div>
              没有邮箱账号？
              <Link href={`/register`}>
                <Button type="link" style={{ padding: "0px" }}>
                  创建账号
                </Button>
              </Link>
            </div>
          }
          style={{ marginBottom: "10px" }}
        >
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
