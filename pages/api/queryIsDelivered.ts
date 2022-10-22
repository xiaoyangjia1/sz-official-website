import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { token, email,pid } = JSON.parse(body);
  console.log(pid)
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
