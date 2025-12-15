import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new PrismaPg({ connectionString:process.env.DATABASE_URL!}) 

const prismaClient = new PrismaClient({adapter:pool});

export default prismaClient