"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext({
  authUser: null,
  sesetAuthUsertUser: (p0: null) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }){

    const [authUser,setAuthUser]=useState(null);

    async function checkAuth(){
          try {
            const apiResponce  =await axios.get("/api/auth/checkAuth") ;

            
             if(apiResponce.data){
                setAuthUser(apiResponce.data)
    }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
      checkAuth();
    },[])
    //@ts-ignore
    return <AuthContext.Provider value={{ authUser,setAuthUser}}>
      {children}
    </AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext);