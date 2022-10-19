import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, query } = req;
  const { token } = JSON.parse(body);
  const { pid } = query;
  request({
    url: "/api/getPosition",
    method: "get",
    params: {
      pid,
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
