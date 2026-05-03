import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const focusUrl = process.env.FOCUS_API_URL;

    if (!focusUrl) {
      return NextResponse.json({ error: "Focus API not configured" }, { status: 503 });
    }

    const res = await fetch(`${focusUrl}/api/public/apply`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Apply proxy error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
