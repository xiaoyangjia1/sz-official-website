import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { setCookie } from "@/utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { email, password } = JSON.parse(body);
  const { data: result } = await request({
    url: "/api/auth/login",
    method: "post",
    data: {
      email,
      password,
    },
  });
  console.log(result);
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    setCookie(res, "email", email);
    setCookie(res, "access_token", data.access_token);
    res.status(200).json(data);
  }
}
