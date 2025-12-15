import prismaClient from "@/lib/client"
import { signInCheck } from "@/utils/schema"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export async function POST(req:NextApiRequest) {
    const parseData = signInCheck.safeParse(req.body);

    if(!parseData.success){
        NextResponse.json({message:"pls send valid data"})
    }

   

    

    return NextResponse.json({message:"new user created "})
}