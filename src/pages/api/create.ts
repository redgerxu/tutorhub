import type { NextApiRequest, NextApiResponse } from "next";
import type { Post, Response } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body) as Post;

      res.status(200).json({
        message: "Data received successfully",
        error: undefined,
      });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred",
        message: "",
      });
    }
  } else {
    res.status(405).json({
      error: "Method not allowed",
      message: "",
    });
  }
}
