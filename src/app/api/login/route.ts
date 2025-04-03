import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; 


dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 400 }
      );
    }

   
    const tokenData = {
      id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

  
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 24 * 60 * 60, 
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 } 
    );
  }
}
