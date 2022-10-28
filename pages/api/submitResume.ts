import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const {
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
  } = JSON.parse(body);
  const { data: result } = await request({
    url: "/api/auth/submitResume",
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
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
