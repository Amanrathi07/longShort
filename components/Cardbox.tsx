import prismaClient from "@/lib/client"
import Card from "./Card";
import { cookies } from "next/headers";

async function allLinks() {
    const token = (await cookies()).get("jwt");
    
    const responce =  await prismaClient.link.findMany()
    return responce ;
}


export default async function Cardbox() {
  
  const data = await allLinks();

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