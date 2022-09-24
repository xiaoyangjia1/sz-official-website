import request from "@/utils/request";
interface Resume {
  college: string;
  email: string;
  learning: string;
  link: string;
  major: string;
  name: string;
  phone: string;
  sex: number;
  sid: string;
  university: string;
  university_life: string;
  wechat: string;
  photo: string;
}

export function submitResume(data: Resume) {
  return request({
    url: "/api/auth/submitResume",
    method: "post",
    data,
  });
}
export function getResumeById(sid: string) {
  return request({
    url: "/api/auth/getResumeById",
    method: "get",
    params: { sid },
  });
}
