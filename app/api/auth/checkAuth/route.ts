import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req:Request){
    console.log("working")

    return NextResponse.json({message:"workint"})
}