"use client";

import { useEffect } from "react";

interface props{
    url:string
}



export default function ChangeUrl({url}:props){
    useEffect(()=>{
        window.location.href = url 
    },[])
  
}