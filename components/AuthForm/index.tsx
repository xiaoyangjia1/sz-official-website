import styles from "./authForm.module.scss";
import { Button, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
const AuthForm = ({ title, api }: any) => {
  const router = useRouter();
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
    if (res.status === 500) {
      form.setFields([{ name: "captcha", errors: ["验证码错误"] }]);
    }
  };
  const onRegisterFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const judgeRegister = async (email: string) => {
    const result = await fetch(`/api/judgeRegister`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
    const data = await result.json();
    return data;
  };
  const checkEmail = async (value: string) => {
    const pattern =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (pattern.test(value)) {
      const isRegister = await judgeRegister(value);
      if (isRegister && router.pathname === "/register") {
        form.setFields([{ name: "email", errors: ["该邮箱已注册!"] }]);
      }
      if (!isRegister && router.pathname === "/resetPassword") {
        form.setFields([{ name: "email", errors: ["该邮箱未注册!"] }]);
      }
    }
  };
  const handleGetCaptcha = async () => {
    form
      .validateFields(["email", "password"])
      .then(async ({ email }: any) => {
        const isRegister = await judgeRegister(email);
        if (isRegister && router.pathname === "/register") {
          form.setFields([{ name: "email", errors: ["该邮箱已注册!"] }]);
          return;
        }
        if (!isRegister && router.pathname === "/resetPassword") {
          form.setFields([{ name: "email", errors: ["该邮箱未注册!"] }]);
          return;
        }

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
        await fetch("/api/getCaptcha", {
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
          <Input
            type="email"
            onChange={(e) => checkEmail(e.target.value)}
            placeholder="输入邮箱"
          />
        </Form.Item>

        <Form.Item
          name="password"
          extra="密码需要是大写字母、小写字母、数字和特殊符号的组合，长度至少8位。"
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}/,
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
