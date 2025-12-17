"use client"
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data,setData]= useState();
  function formHandeler(){
    const dbresponce = axios.post("")
  }
  return (
    <div>
      <form action="">
        <input className="border" type="text" placeholder="url" />
        <button onClick={()=>{formHandeler()}}>send</button>
      </form>
    </div>
  );
}
