import type { NextApiRequest, NextApiResponse } from "next";
import { getPositionByID } from "@/api/position";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  getPositionByID("SZ2023FE")
    .then((result: any) => {
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
