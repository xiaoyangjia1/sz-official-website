import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getJobs } from "@/api/position";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    getJobs()
    .then((result: any) => {
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
