import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "@/utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie(req, "access_token");
  const email = getCookie(req, "email");
  const { data: result } = await request({
    url: "/api/auth/getResume",
    method: "get",
    params: {
      email,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    // res.redirect(401,'/login')
    res.status(error_code).json({message});
  } else {
    res.status(200).json(data);
  }
}
