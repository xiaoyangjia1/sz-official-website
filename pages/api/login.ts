import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { setCookie } from "cookies-next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { email, password } = JSON.parse(body);
  const { data: result } = await request({
    url: "/login",
    method: "post",
    data: {
      email,
      password,
    },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    const MAX_AGE = 60 * 60 * 24;
    setCookie("access_token", data.access_token, {
      req,
      res,
      maxAge: MAX_AGE,
    });
    // expires: new Date(Date.now() + MAX_AGE * 1000),
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // path: "/",
    // sameSite: "lax",
    setCookie("email", email, {
      req,
      res,
      maxAge: MAX_AGE,
    });
    res.status(200).json(data);
  }
}
