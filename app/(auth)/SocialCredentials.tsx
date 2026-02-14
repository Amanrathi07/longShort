"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export function SocialCredentials() {
  const [ lastMethod, setLastMethod ] = useState<null|string>();
 
  return (
    <div className="flex  gap-22 items-center justify-center">
      <Button
        size={"lg"}
        variant="default"
        className="flex items-center gap-2"
        onClick={() => console.log("google")}
      >
        <FaGoogle className="h-4 w-4" />
        Google
       
      </Button>
      <Button
        size={"lg"}
        variant="default"
        className="flex items-center gap-2"
        onClick={() => console.log("github")}
      >
        <FaGithub className="h-4 w-4" />
        GitHub
        
      </Button>
    </div>
  );
}