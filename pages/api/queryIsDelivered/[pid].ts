import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  if (!token) {
    res.status(200).json({ disabled: false });
    return;
  }
  const email = getCookie("email", { req, res });
  const { query } = req;
  const { pid } = query;
  const { data: result } = await request({
    url: "/api/auth/queryIsDelivered",
    method: "get",
    params: {
      email,
      pid,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(result)
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json({ disabled: !!data });
  }
}
