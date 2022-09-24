// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { getResumeById } from "@/api/resume";
import axios from "axios";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("+++++++++++++++++++")
  axios
    .get("http://47.115.228.82:8888/api/auth/getResumeById",{
      params: {
        sid: '3119005073'
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjQwNzYwMzgsImp0aSI6IjUiLCJpc3MiOiJhcHAiLCJuYmYiOjE2NjQwMzE4Mzh9.cqRFA281CGW733QW47E5fjOp_t3WGdE24E3s36kp0rY`,
      },
    })
    .then((result: any) => {
      console.log("111111111111111")
      console.log(result);
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log("22222222222222222")
      console.log(err);
    });
}
