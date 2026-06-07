import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

type RequestBody = {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const { name, company, role, email } = body;

    if (!name?.trim() || !company?.trim() || !role?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const entry = {
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      email: email.trim(),
      submittedAt: new Date().toISOString(),
    };

    const dataDir = process.env.VERCEL
      ? "/tmp"
      : path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, "waitlist.jsonl");
    await writeFile(filePath, JSON.stringify(entry) + "\n", { flag: "a" });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}
