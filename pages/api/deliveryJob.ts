import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  if (!token) {
    res.status(401).json({message: '用户未登录'});
    return 
  }
  const email = getCookie("email", { req, res });
  const { body } = req;
  const { pid } = JSON.parse(body);
  const { data: result } = await request({
    url: "/auth/deliveryJob",
    method: "post",
    data: {
      pid,
      email,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
