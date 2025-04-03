import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Ensure database is fully connected

    const reqBody = await request.json();

    if (!reqBody.productName || !reqBody.quantity || !reqBody.category ||
        !reqBody.manufacturedDate || !reqBody.expiryDate) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const user = await getDataFromToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const newProduct = new Product({
      ...reqBody,
      userId: user,
    });

    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product is added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add Product Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

