import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from 'cookies-next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res })
  if (token) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
}
