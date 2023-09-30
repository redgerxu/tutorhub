import type { NextApiRequest, NextApiResponse } from "next";
import type { Post, Response } from "../../types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    try {
      const data = req.body as Post;

      const posts = collection(db, "tutorials");

      const doc = await addDoc(posts, data);

      res.status(200).json({
        message: doc.id,
        error: undefined,
      });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred",
        message: "",
      });

      console.error(error);
    }
  } else {
    res.status(405).json({
      error: "Method not allowed",
      message: "",
    });
  }
}
