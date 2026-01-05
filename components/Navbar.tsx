"use client"
// import { useAuth } from "@/context/auth";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";


function Navbar({authUser}) {
  
  async function removeCookies(){
    await  axios.get("/api/auth/removeAuth").then(()=>{
      redirect("/signin")
    })
  }
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">Shortify</h1>

          {authUser ? (
            <button onClick={()=>{ removeCookies()}} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium">signout</button>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
  )
}

export default Navbar