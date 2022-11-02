import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "cookies-next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const email = getCookie("email", { req, res });
  const token = getCookie("access_token", { req, res });
  const {
    college,
    learning,
    link,
    major,
    name,
    phone,
    sex,
    sid,
    photo,
    university,
    university_life,
    wechat,
    files,
  } = JSON.parse(body);
  const { data: result } = await request({
    url: "/auth/submitResume",
    method: "post",
    data: {
      college,
      email,
      learning,
      link,
      major,
      name,
      phone,
      sex,
      sid,
      photo,
      university,
      university_life,
      wechat,
      files,
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
