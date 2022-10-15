import type { NextApiRequest, NextApiResponse } from "next";
import { getAllBatch } from "@/api/batch";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    getAllBatch()
    .then((result: any) => {
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
