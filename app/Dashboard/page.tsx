import Navbar from "@/components/Navbar";
import Cardbox from "@/components/Cardbox";
import HomePage from "@/components/HomePage";
import { cookies } from "next/headers";


import prismaClient from "@/lib/client"
import  jwt, { JwtPayload }  from "jsonwebtoken"
import dotenv from "dotenv" ;

dotenv.config({
    path: "../../.env"
})

async function checkAuth(){
  try {
     const token = (await cookies()).get("jwt")
    if(token?.value =="") return
    const jwtToken = jwt.verify(token?.value as string,process.env.SECRET!);
    if(!jwtToken) return 
    const dbResponce = await prismaClient.user.findUnique({where:{id : jwtToken as string}})
    return dbResponce
  } catch (error) {
     return null 
  }
}

export default async  function Dashboard() {
  
  const authUser =await checkAuth()
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-200">
      
      {/* Navbar */}
      <Navbar authUser={authUser} />

      {/* Main Content */}
      <HomePage />

      <Cardbox />
      
    </div>
  );
}

