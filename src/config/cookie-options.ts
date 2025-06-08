import { CookieOptions } from "express";

export default {
  httpOnly: true, // can't be accessed by JS on the client
  secure: false, // set to true in production with HTTPS
  maxAge: 1000 * 60 * 24, // 1 Day
  sameSite: "strict", // helps prevent CSRF
} as CookieOptions;
