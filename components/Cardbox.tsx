import prismaClient from "@/lib/client"
import Card from "./Card";
import { cookies } from "next/headers";
import  jwt, { JwtPayload }  from "jsonwebtoken"
import dotenv from "dotenv" ;

dotenv.config({
    path: "../.env"
})


async function allLinks() {
    const token = (await cookies()).get("jwt")
    if(!token) return
    const jwtToken = jwt.verify(token?.value,process.env.SECRET!);
    if(!jwtToken) return 
    const dbResponce = await prismaClient.link.findMany({where:{userId : jwtToken as string}})

    return dbResponce
}


export default async function Cardbox() {
  

  const data = await allLinks();
  console.log(data)
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        No links generated yet.
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((link: any) => (
          <Card key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}