import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || "";

if (JWT_SECRET === "") {
  throw new Error("JWT_SECRET is not defined");
}

/**
 * Handles the logout functionality.
 * 
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.cookies["COOK"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      verify(token, JWT_SECRET);

      // Set the cookie's maxAge to -1 to delete it
      res.setHeader('Set-Cookie', serialize('COOK', '', {
        maxAge: -1,
        path: '/',
      }));

      res.status(200).json({ message: "Logged out successfully" });
    } catch (e) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
