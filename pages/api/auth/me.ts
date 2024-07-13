import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

if (JWT_SECRET === "") {
  throw new Error("JWT_SECRET is not defined");
}

/**
 * Handles the request to retrieve user information.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 * @returns A Promise that resolves to the response JSON object.
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

      const response = {
        user: "Super Top Secret User",
      };

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
