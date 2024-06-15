
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs'
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request:NextRequest){
    await dbConnect();
    
    try {
        const {username,email,password,phoneNumber,address}= await request.json();
        const hashedPassword=await bcryptjs.hashSync(password,10);
        const verifiedByEmail=await User.findOne({email});
        if(verifiedByEmail){
            return NextResponse.json({
                success:false,
                message:"emailId is already used "
            },{status:400})
        }
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
            phoneNumber,
            address
        })
        await newUser.save();
        return NextResponse.json({
            success:true,
            message:"signup successfully"
        },{status:200})

    } catch (error) {
        console.log("signup error",(error));
        return NextResponse.json({
            success:false,
            message:"signup error"
        },{
            status:400
        }
    )
    }
   
}