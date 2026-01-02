"use client"
import { useAuth } from "@/context/auth";
import Link from "next/link";


function Navbar() {
  const { authUser } = useAuth();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">Shortify</h1>

          {authUser ? (
            <button onClick={async()=>{
            }} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium">signout</button>
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