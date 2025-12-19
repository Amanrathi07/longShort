"use client"
import axios from "axios";
import { usePathname } from "next/navigation";
import {  useRef, useState } from "react";
import QRCode from 'qrcode';

export default function Home() {
  const [data,setData]= useState("");
  const [shortUrl,setShortUrl]= useState<string|null>(null)

  const canvasRef = useRef(null);

  async function formHandeler(e:any){
    e.preventDefault()
    const dbresponce =await axios.post("/api/url",{"link":data});
    const dbSlink = dbresponce.data.shortUrl ;
    console.log("working")
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

        <br />
        <br />
        <button onClick={()=>{
           QRCode.toCanvas(canvasRef.current, "https://www.youtube.com/watch?v=YsB4Vhlv8ns&list=RDYsB4Vhlv8ns&start_radio=1", {
          width: 300,
          margin: 2
        });
        }}>qr generate</button>
    </div>:""}

        <canvas ref={canvasRef}></canvas>
        
    </div>
  );
}
