import bcrypt from "bcryptjs";
import prismaClient from "@/lib/client";
import { jwt_create } from "@/utils/jwt_create";
import { signUpCheck } from "@/utils/schema";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    console.log("get the request")
    const requestBody = await req.json()
    const parseData = signUpCheck.safeParse(requestBody);
    if(!parseData.success){
        return NextResponse.json({message:"invalide data formate"})
    }

    try {
        
    const existUser = await prismaClient.user.findFirst({
        where:{email:parseData.data.email}
    })

    if(existUser){
        return NextResponse.json({message:"user alrady exist"})
    }

    const hashPassword = await bcrypt.hash(parseData.data.password,5);

    const newUser = await prismaClient.user.create({
        data:{
            name:parseData.data.name,
            email:parseData.data.email,
            password:hashPassword
        }
    })
    
    const token = jwt_create(newUser.id);

   if(!token)return
   (await cookies()).set("jwt",token)
   return NextResponse.json({message:"user created successful"})
    } catch (error) {
        console.log("error in signup function",error);
        return NextResponse.json({message:"internal server error"})
    }
}