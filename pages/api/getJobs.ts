import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: result } = await request({
    url: "/getJobs",
    method: "get",
  });
  const { error_code, data, message } = result;

  if (!message) {
    // 返回缓存
    res.status(200).json(result);
    return;
  }
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    const resData = data.filter((el: any) => {
      return el.status === 1;
    });
    res.status(200).json(resData);
  }
}
