import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;
  const { token, email, pid } = JSON.parse(body);
  request({
    url: "/api/auth/deliveryJob",
    method: "post",
    data: {
      pid,
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
