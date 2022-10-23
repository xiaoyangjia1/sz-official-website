import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "@/utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie(req, "access_token");
  if (token) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
}
