import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async  function GET(req : Request){
    (await cookies()).set("jwt","")
    return NextResponse.json({message:"done"})
}