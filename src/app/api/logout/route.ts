import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create response
    const response = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );

    // Clear cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/"
    });

    return response;

  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}