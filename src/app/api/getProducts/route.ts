import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    dbConnect();
   try {
    const user=await getDataFromToken(request);
    const product = await Product.aggregate([
        { $match: { userId: user } },
      ]).exec();


      if (!product || product.length === 0) {
        return NextResponse.json(
          { message: 'User not found', success: false },
          { status: 404 }
        );
      }
  

      return NextResponse.json({
        message:product
      },{
        status:200
      })

   } catch (error:any) {
    console.log("get Products error",{error})
    return NextResponse.json({
       success:false,
       message:error.message
     },{status:500})
   }
}
