import { NextPage } from "next";
import AuthForm from "@/components/AuthForm";
const ResetPassword: NextPage = () => {
  return <AuthForm title={"重置密码"} api="resetPassword"/>;
};
export default ResetPassword;
