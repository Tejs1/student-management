import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  const randomBoolean = Math.random() >= 0.5;
  if (randomBoolean) {
    return NextResponse.json({ data: true }, { status: 400 });
  }
  return NextResponse.json({ data: false });
}
