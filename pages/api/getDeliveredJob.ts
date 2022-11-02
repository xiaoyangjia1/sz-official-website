import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie,  setCookie } from "cookies-next";
interface DeliveredItem {
  id: number;
  email: string;
  name: string;
  pid: string;
  title: string;
  batch: string;
  category: string;
  test: number;
  interview: number;
  check1: number;
  check2: number;
  offer: number;
  files1: string;
  files2: string;
  link1: string;
  link2: string;
  created_at: string;
  updated_at: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  const email = getCookie("email", { req, res });
  const { data: result } = await request({
    url: "/auth/getDeliveredJob",
    method: "get",
    params: {
      email,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  const { error_code, data, message } = result;
  if (error_code) {
    res.status(error_code).json({ message });
  } else {
    let deliveredInfo: {
      [key: string]: number;
    } = {};
    data.forEach((el: DeliveredItem) => {
      if (deliveredInfo[el.batch]) {
        deliveredInfo[el.batch]++;
      } else {
        deliveredInfo[el.batch] = 1;
      }
    });
    setCookie("deliveredInfo", JSON.stringify(deliveredInfo), { req, res });
    res.status(200).json(data);
  }
}
