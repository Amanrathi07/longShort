"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
     const [data , setData]=useState({name:"",email:"",password:""})
  
     //@ts-ignore
        async function formHandal(e){
            
            e.preventDefault();
            await axios.post('/api/auth/signup',data,{withCredentials:true})
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-linear-to-br from-indigo-500/20 to-purple-500/20 text-white">
          <h1 className="text-4xl font-bold mb-4">Create Account ✨</h1>
          <p className="text-gray-300 leading-relaxed">
            Join us and start building amazing things today.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-10 text-gray-200">
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-400 mb-8">Create your new account</p>

          <form onSubmit={formHandal} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input onChange={(e)=>{setData({...data,name:e.target.value})}}
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input onChange={(e)=>{setData({...data,email:e.target.value})}}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input onChange={(e)=>{setData({...data,password:e.target.value})}}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-indigo-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
