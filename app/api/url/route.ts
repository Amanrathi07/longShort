import prismaClient from "@/lib/client";
import { NextResponse } from "next/server";


let caracter="abcdefghijklmanopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

function shortLinkGen(){
    let shorturl="";
    let length = caracter.length ;
   

    for(let i=0;i<16;i++){
        shorturl += caracter.at(Math.floor(Math.random()*length))
    }
    return shorturl;
}



export async function POST(req:Request){
    const parsedLink = await req.json();
    const {link} = parsedLink

    console.log("the link from postman",link)
    const shortLink = shortLinkGen()

    const existingShortUrl = await prismaClient.link.findUnique({
        where:{shortUrl:shortLink}
    }) 

    
    if(existingShortUrl){ return NextResponse.json({message:"pls try again"})}

    const dbResponce = await prismaClient.link.create({
        data:{
            shortUrl:shortLink ,
            url : link ,
        }
    })

    return NextResponse.json({message:"added to db ", shortUrl:dbResponce.shortUrl})

}