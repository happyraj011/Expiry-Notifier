import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  dbConnect();
  try {
   const reqBody=await request.json();
   
  if(!reqBody.productName  ||  !reqBody.quantity  ||  !reqBody.category  ||  
    !reqBody.manufacturedDate  ||   !reqBody.expiryDate){
         return NextResponse.json({
         success:false,
         message:"Please provide all required fields",
    },{
        status:400,
    })
}    

    const user=await getDataFromToken(request);
   
    const newProduct=new Product({
        ...reqBody,
        userId:user
    });
      await  newProduct.save();
      return NextResponse.json({
        success:true,
        message:"Product is added successfully"
      },{
        status:200
      })

  
  } catch (error:any) {
     console.log("add Product error",{error})
     return NextResponse.json({
        success:false,
        message:error.message
      },{status:500})
  }
   
}
