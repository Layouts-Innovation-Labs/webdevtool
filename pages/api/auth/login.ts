import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/app/utils/hash";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

/**
 * Handles the login API endpoint.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { type, username, password, email, wardSurname } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("EduAmor");
      let user;

      if (type === "school") {
        user = await db.collection("institutions").findOne({ username });
      } else if (type === "parent") {
        user = await db.collection("parents").findOne({ email, wardSurname });
      } else {
        return res.status(400).json({ message: "Invalid login type" });
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: userPassword, ...userData } = user;
      const token = jwt.sign({ userData, type }, JWT_SECRET as string, {
        expiresIn: 60 * 60,
      });

      const seralized = serialize("COOK", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });

      const response = {
        message: "Authenticated!",
      };

      res
        .setHeader("Set-Cookie", seralized)
        .status(200)
        .json({ message: "Login successful", userData });
    } catch (error) {
      res.status(500).json({ error: "Unable to process request " + error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
