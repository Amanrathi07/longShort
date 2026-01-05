import ChangeUrl from "@/components/ChangeUrl"
import prismaClient from "@/lib/client"
import { redirect } from "next/navigation"

interface props{
    params:{
        shortUrl:string
    }
}

async function updateDb(url:string){
    await prismaClient.link.update({
        where:{shortUrl:url},
        data:{click_count:{
            increment: 1
        }}
    })
}

async function realUrl(url:string) {
    const dbresponce = await prismaClient.link.findFirst({
        where:{shortUrl:url}
    })
    await updateDb(url)
    return dbresponce?.url
}

export default async function({params}:props){
    const {shortUrl} =await params
    const url = await realUrl(shortUrl)
    if(!url) return;
    // redirect from server 
    redirect(url)
  
}