import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { token, email } = JSON.parse(body);
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
