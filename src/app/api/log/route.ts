import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { logs } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const data = JSON.stringify(body);

    await db.insert(logs).values({
      data,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error logging data:", error);
    return NextResponse.json({ error: "Failed to log data" }, { status: 500 });
  }
}

//on get return the latest 10 logs
export async function GET() {
  const data = await db
    .select()
    .from(logs)
    .orderBy(desc(logs.createdAt))
    .limit(10);
  console.log(data);
  if (!data) {
    return NextResponse.json({ error: "Failed to get logs" }, { status: 500 });
  }
  //throw erroes randomly
  if (Math.random() > 0.9) {
    return NextResponse.json({ error: "Failed to get logs" }, { status: 404 });
  }
  return NextResponse.json(data);
}
