import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import request from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  const { data: result } = await request({
    url: "/auth/judgeLogin",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  });
  const { error_code } = result;
  if (error_code) {
    res.status(error_code).json({ loggedIn: false });
  } else {
    res.status(200).json({ loggedIn: true });
  }
}
