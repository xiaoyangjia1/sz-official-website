import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "@/utils/cookie";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getCookie(req, "token");
  const email = getCookie(req, "email");
  request({
    url: "/api/auth/getDeliveredJob",
    method: "get",
    params: {
      email,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result: any) => {
      console.log(result.data.data);
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
