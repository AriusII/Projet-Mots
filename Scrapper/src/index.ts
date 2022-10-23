import { PrismaClient } from '@prisma/client'
import { dbMain } from "../prisma/classes/db"
import { Main } from "./class/main"
import { Process } from "./class/process"
declare global {
	var prisma: PrismaClient
}
global.prisma = new PrismaClient()
let db = new dbMain()
let process = new Process()
let main = new Main()

async function start() {
    // get all the words from the first page
    let first_url = 'https://www.listesdemots.net/touslesmots.htm'
    let page = '1'
    let words = await main.start_process(first_url)
    for (let word of words) {
        let first_letter = await process.get_first_letter(word)
        let word_length = await process.get_length_of_word(word)
        let consonnes = await process.get_consonnes_from_word(word)
        let c_length = await process.get_number_of_consonnes(word)
        let c_unique = await process.get_unique_consonnes_from_word(word)
        let voyelles = await process.get_voyelles_from_word(word)
        let v_length = await process.get_number_of_voyelles(word)
        let v_unique = await process.get_unique_voyelles_from_word(word)
        let double_letters = await process.check_two_letters_rows(word)
        await db.insertWord(page, first_letter, word, word_length, consonnes, c_length, c_unique, voyelles, v_length, v_unique, double_letters)
    }
    for (let i = 2; i < 918; i++) {
        page = i.toString()
        let url = `https://www.listesdemots.net/touslesmotspage${i}.htm`
        let words = await main.start_process(url)
        for (let word of words) {
            let first_letter = await process.get_first_letter(word)
            let word_length = await process.get_length_of_word(word)
            let consonnes = await process.get_consonnes_from_word(word)
            let c_length = await process.get_number_of_consonnes(word)
            let c_unique = await process.get_unique_consonnes_from_word(word)
            let voyelles = await process.get_voyelles_from_word(word)
            let v_length = await process.get_number_of_voyelles(word)
            let v_unique = await process.get_unique_voyelles_from_word(word)
            let double_letter = await process.check_two_letters_rows(word)
            await db.insertWord(page, first_letter, word, word_length, consonnes, c_length, c_unique, voyelles, v_length, v_unique, double_letter)
        }
    }
    console.log("It's done !")
}

start()