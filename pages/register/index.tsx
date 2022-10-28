import { NextPage } from "next";
import AuthForm from "@/components/AuthForm";
const Register: NextPage = () => {
  return <AuthForm title="创建账号" api="register" />;
};
export default Register;
