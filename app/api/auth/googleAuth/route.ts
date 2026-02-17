import { NextResponse } from "next/server";

import admin from "@/lib/firebase-admin";
import prismaClient from "@/lib/client";
import { jwt_create } from "@/utils/jwt_create";
import { cookies } from "next/headers";





export async function POST(req:Request){
    const data = await req.json() ;
    const responce = await admin.auth().verifyIdToken(data.accessToken)
    
    const user = await prismaClient.user.findUnique({
        where:{email:responce.email}
    })

    if(user){
        const token = jwt_create(user.id);

        if(!token)return
        (await cookies()).set("jwt",token)
        console.log("user is find")
        return NextResponse.json({message:"signin successful"})
    }


    const newUser = await prismaClient.user.create({
        data:{
            name:responce?.name,
            email:responce?.email,
        }
    })
    
    const token = jwt_create(newUser.id);

    if(!token)return
   (await cookies()).set("jwt",token)
    console.log("user is created")
   return NextResponse.json({message:"user created successful"})
}