// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  axios
    .get("http://47.115.228.82:8888/api/auth/getResumeById",{
      params: {
        sid: '3119005073'
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjQzMTgzNTIsImp0aSI6IjUiLCJpc3MiOiJhcHAiLCJuYmYiOjE2NjQyNzQxNTJ9.Rfj8E9hBFRuh_85wrZFFkANkdJleZzUkdkpDHrLof68`,
      },
    })
    .then((result: any) => {
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
