import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { batch, title, email, name } = JSON.parse(body);
  const { data: result } = await request({
    url: "/deleteUploadedFile",
    method: "delete",
    params: { batch, title, email, name },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
