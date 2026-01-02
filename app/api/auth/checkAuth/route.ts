import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";
import prismaClient from "@/lib/client";

dotenv.config({
    path:"../../../../.env"
})

console.log(process.env.SECRET)

export async function GET(req:Request){
    const token = (await cookies()).get("jwt") ;
    if(!token) return ;
    const userId = jwt.verify(token?.value,process.env.SECRET!);
    const dbResponce = await prismaClient.user.findFirst({
        where:{id:userId as string}
    })
    return NextResponse.json({name : dbResponce?.name , email: dbResponce?.email , createdAt : dbResponce?.createdAt})
}