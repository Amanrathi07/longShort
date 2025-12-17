"use client"
import axios from "axios";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [data,setData]= useState("");
  const [shortUrl,setShortUrl]= useState<string|null>(null)
  async function formHandeler(e){
    e.preventDefault()
    const dbresponce =await axios.post("/api/url",{"link":data});
    const dbSlink = dbresponce.data.shortUrl ;
    console.log(dbSlink)
    setShortUrl(dbSlink)
  }
  return (
    <div>
      <form action="">
        <input className="border" type="text" placeholder="url" onChange={(e)=>{setData(e.target.value)}}/>
        <button onClick={(e)=>{formHandeler(e)}}>send</button>
      </form>
      <br />
      
    {shortUrl?<div>
        {`${window.location.href}/${shortUrl}`}  <button onClick={()=>{
          navigator.clipboard.writeText(`${window.location.href}/${shortUrl}`)
        }}>copy</button>
    </div>:""}

    </div>
  );
}
