import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: result } = await request({
    url: "/api/getJobs",
    method: "get",
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    res.status(200).json(
      data.filter((el: any) => {
        return el.status === 1;
      })
    );
  }
}
