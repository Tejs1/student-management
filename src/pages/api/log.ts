import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { logs } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const body: unknown = req.body;
      const data = JSON.stringify(body);

      await db.insert(logs).values({
        data,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error logging data:", error);
      return res.status(500).json({ error: "Failed to log data" });
    }
  }

  if (req.method === "GET") {
    try {
      const data = await db
        .select()
        .from(logs)
        .orderBy(desc(logs.createdAt))
        .limit(10);

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error getting logs:", error);
      return res.status(500).json({ error: "Failed to get logs" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
