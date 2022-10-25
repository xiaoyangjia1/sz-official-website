import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data: result } = await request({
    url: "/api/getAllBatch",
    method: "get",
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
