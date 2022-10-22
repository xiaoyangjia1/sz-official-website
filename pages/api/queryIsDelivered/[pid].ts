import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie } from "@/utils/cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getCookie(req, "token");
  const email = getCookie(req, "email");
  const { query } = req;
  const { pid } = query;
  request({
    url: "/api/auth/queryIsDelivered",
    method: "get",
    params: {
      email,
      pid,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result: any) => {
      console.log(result);
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
