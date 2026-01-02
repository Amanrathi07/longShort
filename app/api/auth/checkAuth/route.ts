import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";

dotenv.config({
    path:"../../../.env"
})

console.log(process.env.SECRET)

export async function GET(req:Request){
    const token = (await cookies()).get("jwt") ;

    // const answer = jwt.verify(token?.value,)

    return NextResponse.json({message:"workint"})
}