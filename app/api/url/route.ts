import prismaClient from "@/lib/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import  jwt, { JwtPayload }  from "jsonwebtoken"


interface dataProps{
    shortUrl: string,
    url: string,
    userId? : string | JwtPayload

}

const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function shortLinkGen() {
  let shortUrl = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 8; i++) {
    shortUrl += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return shortUrl;
}




export async function POST(req: Request) {
  const parsedLink = await req.json();
  const { link } = parsedLink;

  if (!link || typeof link !== "string") {
    return NextResponse.json(
      { error: "Invalid link provided" },
      { status: 400 }
    );
  }

  let shortLink;
  let attempts = 0;
  const maxAttempts = 5;

        while (attempts < maxAttempts) {
          shortLink = shortLinkGen();
          const existingUser = await prismaClient.link.findUnique({
            where: { shortUrl: shortLink },
          });

        if(!existingUser){
            break 
          }
        attempts++;  
        }

if(!shortLink)return NextResponse.json({message:"pls try afret some time"})



    let data:dataProps ;

    const allCookies =await cookies()
    const token = allCookies.get("jwt");
    
    let jwtToken
    if(token){
        jwtToken = jwt.verify(token?.value,process.env.SECRET!);
    }

    
    
    
    
    
    if(jwtToken){
    data={
      shortUrl: shortLink,
      url: link,
      userId: jwtToken
    }
    }else{
    data= {
      shortUrl: shortLink,
      url: link,
    }
    }
    

  const dbResponce = await prismaClient.link.create({
    //@ts-ignore
    data:data,
  });

  return NextResponse.json({
    message: "added to db ",
    shortUrl: dbResponce.shortUrl,
  });
}
