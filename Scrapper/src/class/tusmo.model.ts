import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function find_word(first_letter: string, word_length: number, good_letters: string, bad_letters: string, word_begin: string, word_end: string) {
    try {
        await prisma.words.findMany({
            where: {
                first_letter: first_letter,
                word_length: word_length,
                word: {
                    startsWith: word_begin,
                    contains: good_letters,
                    not: {
                        contains: bad_letters,
                    },
                    endsWith: word_end,
                },
            },
            select: {
                word: true,
            }
        })
    } catch (error) {
        console.log(error);
    }
}