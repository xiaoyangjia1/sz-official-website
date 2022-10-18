import { NextPage } from "next";
import styles from "./login.module.scss";
import { Button, Form, Input } from "antd";
import { login } from "@/api/user";
import { setLocalStorage } from "@/utils/auth";
import router from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { setToken,setEmail, selectToken } from "@/app/reducer/userSlice";
import { store } from "@/app/store";
const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    login({
      email: values.email,
      password: values.password,
    })
      .then((res: any) => {
        if (res.data.error_code > 0) {
          console.log(res.data.message);
        } else {
          let data = res.data.data;
          setLocalStorage("admin_token", data.access_token);
          dispatch(setToken(data.access_token));
          dispatch(setEmail(values.email));
          router.push("/personal/application");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
    </div>
  );
};
export default Login;
