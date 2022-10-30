import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie, getCookies } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie("access_token", { req, res });
  res.status(200).json({ loggedIn: !!token });
}
