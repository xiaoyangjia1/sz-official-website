import type { NextApiRequest, NextApiResponse } from "next";
import { getJobs } from "@/api/position";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getJobs()
    .then((result: any) => {
      res.status(200).json(
        result.data.data.filter((el: any) => {
          return el.status === 1;
        })
      );
    })
    .catch((err: any) => {
      console.log(err);
    });
}
