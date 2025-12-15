import z from "zod";

export const signUpCheck = z.object({
    name:z.string().min(3,"name too short").max(40),
    email:z.email("pls send valid email").min(3).max(20),
    password:z.string().min(3,"name too short").max(40),
})


export const signInCheck = z.object({
    email:z.email("pls send valid email").min(3).max(20),
    password:z.string().min(3,"name too short").max(40),
})