import prismaClient from "@/lib/client"
import { jwt_create } from "@/utils/jwt_create"
import { signInCheck } from "@/utils/schema"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    const requestBody = await req.json()
    const parseData = signInCheck.safeParse(requestBody);

    if(!parseData.success){
       return NextResponse.json({message:"pls send valid data"})
    }

    try {
        const user = await prismaClient.user.findUnique({
        where:{email:parseData.data?.email}
    })

    if(!user){
        return NextResponse.json({message:"user dos't exist"})
    }

  const matchPassword =await bcrypt.compare(parseData.data?.password,user.password)

   if(!matchPassword){
    return NextResponse.json({message:"password is incorrect"})
   }
   const token = jwt_create(user.id);
   
   if(!token) return

    (await cookies()).set("jwt",token)

    return NextResponse.json({message:"signin successful"})
    } catch (error) {
        console.log("error in function signin",error);
        return NextResponse.json({message:"internal server error"})
    }
}