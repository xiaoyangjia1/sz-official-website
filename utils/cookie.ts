import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, parse, CookieSerializeOptions } from "cookie";
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: any,
  options: CookieSerializeOptions = {}
) => {
  const MAX_AGE = 60 * 60 * 24 * 60; // 60 天
  const cookie = serialize(name, value, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
  res.setHeader("Set-Cookie", cookie);
};
export function parseCookies(req: NextApiRequest) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}
export function getCookie(req: NextApiRequest, name: string) {
  const cookies = parseCookies(req);
  return cookies[name];
}
export function removeCookie(
  res: NextApiResponse,
  name: string
) {
  const cookie = serialize(name, "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}
