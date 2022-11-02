import type { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";
import { getCookie, setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  const email = getCookie("email", { req, res });
  const { data: result } = await request({
    url: "/auth/getResume",
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
    let isPerfectedResume=true 
    for (let key in data) {
      if (data[key] === "" && key !== "link") {
        setCookie("isPerfectedResume", false, { req, res });
        isPerfectedResume=false
        break;
      }
    }
    if(isPerfectedResume){
      setCookie("isPerfectedResume", true, { req, res });
    }
    res.status(200).json(data);
  }
}
