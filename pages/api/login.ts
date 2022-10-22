import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { email, password } = JSON.parse(body);
  request({
    url: "/api/auth/login",
    method: "post",
    data: {
      email,
      password,
    },
  })
    .then((result: any) => {
      console.log(result.data.data);
      setCookie(res, "token", result.data.data.access_token);
      setCookie(res, "email", email);
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
