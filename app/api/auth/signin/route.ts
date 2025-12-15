import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest) {
    console.log(req)

    return NextResponse.json({message:"working"})
}