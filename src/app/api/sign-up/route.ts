import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { username, email, password, phoneNumber, address } = await request.json();
    
    // Validate required fields
    if (!username || !email || !password || !phoneNumber || !address) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "Signup successful" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Signup failed" },
      { status: 500 }
    );
  }
}