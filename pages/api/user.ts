import request from "@/utils/request";
interface LoginInfo {
  email: string;
  password: string;
}

export function login(data: LoginInfo) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}
