import request from "@/utils/request";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await request({
    url: "/api/getAllCategory",
    method: "get",
  });
  const { data } = result.data;
  if (data.error_code) {
    res.status(data.error_code).json(data.message);
  } else {
    res.status(200).json(data);
  }
}
