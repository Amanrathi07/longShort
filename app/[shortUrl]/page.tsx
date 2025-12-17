import ChangeUrl from "@/components/ChangeUrl"
import prismaClient from "@/lib/client"

interface props{
    params:{
        shortUrl:string
    }
}

async function realUrl(url:string) {
    const dbresponce = await prismaClient.link.findFirst({
        where:{shortUrl:url}
    })

    return dbresponce?.url
}

export default async function({params}:props){
    const {shortUrl} =await params
    const url = await realUrl(shortUrl)
    if(!url) return
    return(
        //@ts-ignore        
        <ChangeUrl url={url}/>
    )
}