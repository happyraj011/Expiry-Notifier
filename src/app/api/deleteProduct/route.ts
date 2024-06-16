import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request:NextRequest) {
   dbConnect();
   try {
      
      
     const url=new URL(request.url);
     const _id=url.searchParams.get("_id");
     const product=await Product.findById(_id)

     
      if(!product){
           return  NextResponse.json({
          success:false,
          message:"Product not found"
        },{
          status:404
        })
      }
     await Product.deleteOne(product)
      return NextResponse.json({
        success:true,
        message:"The product has been deleted"
      },{
        status:200
      })

   } catch (error:any) {
    console.log(" Product deletion error",{error})
    return NextResponse.json({
       success:false,
       message:error.message
     },{status:500})
   }
}
