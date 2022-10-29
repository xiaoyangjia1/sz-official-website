import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { email, password,captcha } = JSON.parse(body);
  const { data: result } = await request({
    url: "/api/register",
    method: "post",
    data: {
      email,
      password,
      captcha
    },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    const MAX_AGE = 60 * 60 * 24 * 1;
    setCookie("access_token", data.access_token, {
        req,
        res,
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
      setCookie("email", email, {
        req,
        res,
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    res.status(200).json(data);
  }
}
