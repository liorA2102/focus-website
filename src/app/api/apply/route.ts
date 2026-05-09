import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const focusUrl = process.env.FOCUS_API_URL;

    if (!focusUrl) {
      return NextResponse.json({ error: "Focus API not configured" }, { status: 503 });
    }

    const file = formData.get("cv");
    if (file instanceof File) {
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json({ error: "Only PDF and Word documents are accepted" }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "File must be under 10 MB" }, { status: 400 });
      }
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
