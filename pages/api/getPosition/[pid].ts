import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { pid } = query;
  const { data: result } = await request({
    url: "/getPosition",
    method: "get",
    params: {
      pid,
    },
  })
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
