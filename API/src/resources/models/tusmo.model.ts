import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function find_word(sql: string) {
    try {
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        console.log(error);
    }
}