import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
dbConnect();


export async function POST(request: NextRequest) {

  try {
    const reqBody=await request.json();
    const { email, password } = reqBody;
    const validUser = await User.findOne({ email });
   
    if (!validUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not exist",
        },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Password",
        },
        { status: 400 }
      );
    }
  

    const tokenData = {
      id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    };

    
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
    
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set('token', token, {
            httpOnly: true, 
            
        })
 
        return response;




  } catch (error:any) {
    return NextResponse.json(
      {
       success:false,
        error:error.message
      },
      { status: 400 }
    );
  }
}
