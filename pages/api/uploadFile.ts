import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { formData } = JSON.parse(body);
  const { data: result } = await request({
    url: "/uploadFile",
    method: "post",
    data: formData.get('file'),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(data);
  }
}
