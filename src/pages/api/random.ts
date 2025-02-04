import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const randomBoolean = Math.random() >= 0.5;

  return res.status(200).json({
    success: true,
    result: randomBoolean,
  });
}
