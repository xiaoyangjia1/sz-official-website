import styles from "./authForm.module.scss";
import { Button, Col, Form, Input, message, Modal, Row, Slider } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
const AuthForm = () => {
  const router = useRouter();
  const { pathname, push } = router;
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const captcha = Form.useWatch("captcha", form);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deg, setDeg] = useState<number>(0);
  const [sliderDisabled, setSliderDisabled] = useState<boolean>(false);
  const [revalidateDisabled, setRevalidateDisabled] = useState<boolean>(true);
  const [picNum, setPicNum] = useState<number>(
    1 + Math.floor(Math.random() * 7)
  );
  const text =
    pathname === "/register"
      ? "注册"
      : pathname === "/login"
      ? "登录"
      : "重置密码";
  const initialValues = {
    email: pathname !== "/register" ? getCookie("sz_email") || "" : "",
  };
  const onFinishFailed = (errorInfo: any) => {
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
  // 检查邮箱是否注册,注册页面应未注册，登录和重置密码页面应已注册
  const checkEmailRegister = async (email: string) => {
    const isRegister = await judgeRegister(email);
    if (isRegister && pathname === "/register") {
      form.setFields([{ name: "email", errors: ["该邮箱已注册!"] }]);
      return false;
    }
    if (!isRegister && pathname !== "/register") {
      form.setFields([{ name: "email", errors: ["该邮箱未注册!"] }]);
      return false;
    }
    return true;
  };
  const checkEmail = async (email: string) => {
    const pattern =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (pattern.test(email)) {
      checkEmailRegister(email);
    }
  };
  const handleGetCaptcha = async () => {
    form
      .validateFields(["email", "password"])
      .then(async ({ email }: any) => {
        const pass = await checkEmailRegister(email);
        if (pass) {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSliderChange = (newValue: number) => {
    const newDeg = (360 * newValue) / 100;
    setDeg(newDeg);
  };
  const onSliderAfterChange = (newValue: number) => {
    const newDeg = (360 * newValue) / 100;
    setSliderDisabled(true);
    if (Math.abs(newDeg - 180) < 20) {
      setTimeout(() => {
        setIsModalOpen(false);
        handleAuth();
      }, 1000);
      message.success("图片验证成功");
    } else {
      setRevalidateDisabled(false);
      message.error("图片验证失败");
    }
  };
  const onModalCancel = () => {
    console.log("1111111");
    setDeg(0);
    setSliderDisabled(false);
    setRevalidateDisabled(true);
    setIsModalOpen(false);
    setPicNum(1 + Math.floor(Math.random() * 7));
  };
  const handleAuth = async () => {
    setLoading(true);
    const res = await fetch(`/api${pathname}`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        captcha,
      }),
    });
    if (res.status === 200) {
      push("/personal/application");
      setCookie("sz_email", email);
    }
    if (res.status === 500) {
      const fields =
        pathname === "/login"
          ? [
              { name: "email", errors: ["邮箱或密码错误"] },
              { name: "password", errors: ["邮箱或密码错误"] },
            ]
          : [{ name: "captcha", errors: ["验证码错误"] }];
      form.setFields(fields);
      setLoading(false);
    }
  };
  const handleRevalidate = () => {
    setDeg(0);
    setSliderDisabled(false);
    setRevalidateDisabled(true);
    setPicNum(1 + Math.floor(Math.random() * 7));
  };
  return (
    <>
      <div className="pageWarp">
        <Form
          form={form}
          name="basic"
          style={{
            width: "20%",
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={() => {
            setIsModalOpen(true);
          }}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
          size="large"
          autoComplete="off"
        >
          {pathname === "/login" ? null : (
            <Link href="/login">
              <a className={styles.title}>
                &lt; {pathname === "/register" ? "创建账号" : "重置密码"}
              </a>
            </Link>
          )}
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
            extra={
              pathname === "/login" ? (
                <Link href={"/resetPassword"}>
                  <Button type="link" className={styles.toResetPasswordBtn}>
                    忘记密码？
                  </Button>
                </Link>
              ) : (
                "密码需要是大写字母、小写字母、数字和特殊符号的组合，长度至少8位。"
              )
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
            <Input.Password placeholder="设置密码" />
          </Form.Item>
          {pathname === "/login" ? null : (
            <Form.Item>
              <Row gutter={8}>
                <Col span={14}>
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
                <Col span={10}>
                  <Button onClick={handleGetCaptcha} disabled={disabled}>
                    {disabled ? `${second}后重新发送` : "获取验证码"}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          )}

          <Form.Item
            extra={
              pathname === "/login" ? (
                <div>
                  没有邮箱账号？
                  <Link href={`/register`}>
                    <Button type="link" style={{ padding: "0px" }}>
                      创建账号
                    </Button>
                  </Link>
                </div>
              ) : null
            }
          >
            <Button type="primary" htmlType="submit" block loading={loading}>
              {text}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="图片验证"
        open={isModalOpen}
        onCancel={onModalCancel}
        destroyOnClose={true}
        footer={
          <Slider
            onChange={onSliderChange}
            onAfterChange={onSliderAfterChange}
            disabled={sliderDisabled}
            value={(deg * 100) / 360}
            tooltip={{ open: false }}
          />
        }
        style={{ top: "40%" }}
        bodyStyle={{ textAlign: "center" }}
        width={300}
      >
        <Image
          src={`/180_${picNum}.jpg`}
          alt="图片失效"
          priority={true}
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            transform: `rotate(${deg}deg)`,
            objectFit: "fill"
          }}
        />
        <Button disabled={revalidateDisabled} onClick={handleRevalidate}>
          重新验证
        </Button>
      </Modal>
    </>
  );
};
export default AuthForm;
