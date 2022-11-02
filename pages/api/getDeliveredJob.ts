import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie,getCookies } from 'cookies-next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  const email = getCookie("email", { req, res });
  const { data: result } = await request({
    url: "/auth/getDeliveredJob",
    method: "get",
    params: {
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
