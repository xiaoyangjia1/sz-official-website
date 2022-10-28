import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { email } = JSON.parse(body);
  const { data: result } = await request({
    url: "/api/getCaptcha",
    method: "get",
    params: {
      email,
    },
  });
  console.log(result)
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
