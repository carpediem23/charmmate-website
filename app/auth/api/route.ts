import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  const route = request.url.split("auth/")[1];
  const body = await request.json();
  console.log("OSMAN");
  try {
    const response = await fetch(`${API_URL}/auth/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("OSMAN 1");
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(data);
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log("OSMAN 2");

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const route = request.url.split("auth/")[1];

  try {
    const response = await fetch(`${API_URL}/auth/${route}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(data);
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
