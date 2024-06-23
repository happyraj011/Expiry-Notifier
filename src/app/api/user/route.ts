import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'


dbConnect()

export async function  GET(request:NextRequest) {
  try {
    
     const userId=await getDataFromToken(request);
     const user=await User.findOne({_id:userId}).select("-password");
     return NextResponse.json({
      message: "User found",
      data: user
     },{
        status:200
     })
  } catch (error:any) {
     return  NextResponse.json({
         success:false,
         message:error.message
       },{
        status:400
       })
  }
}
