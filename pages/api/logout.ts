import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { removeCookie} from "@/utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: result } = await request({
    url: "/api/auth/logout",
    method: "post",
  });
  console.log("logout: ",result);
  removeCookie(res, "email");
    removeCookie(res, "access_token");
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
