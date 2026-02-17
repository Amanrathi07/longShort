import { NextResponse } from "next/server";

import admin from "@/lib/firebase-admin";





export async function POST(req:Request){
    const data = await req.json() ;
    const responce = await admin.auth().verifyIdToken(data.accessToken)
    console.log(responce)

    NextResponse.json({
        message : "working !!!   "
    })
}