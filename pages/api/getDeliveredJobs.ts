import type { NextApiRequest, NextApiResponse } from "next";
import { getDeliveredJob } from "@/api/progress";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  getDeliveredJob("3119005073")
    .then((result: any) => {
      res.status(200).json(result.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
