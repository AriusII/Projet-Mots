export class Process {
    voyelles_list: string[]
    consonnes_list: string[]
    constructor() {
        this.voyelles_list = ["A", "E", "I", "O", "U", "Y"]
        this.consonnes_list = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]
    }

    async get_length_of_word(word: string) {
        return word.length
    }

    async get_voyelles_from_word(word: string) {
        let voyelles: string = ''
        for (let letter of word) {
            if (this.voyelles_list.includes(letter)) {
                voyelles += letter
            }
        }
        return voyelles
    }

    async get_number_of_voyelles(word: string) {
        let count = 0
        for (let letter of word) {
            if (this.voyelles_list.includes(letter)) {
                count++
            }
        }
        return count
    }

    async get_unique_voyelles_from_word(word: string) {
        let voyelles: string = ''
        for (let letter of word) {
            if (this.voyelles_list.includes(letter)) {
                if (!voyelles.includes(letter)) {
                    voyelles += letter
                }
            }
        }
        return voyelles
    }

    async get_consonnes_from_word(word: string) {
        let consonnes: string = ''
        for (let letter of word) {
            if (this.consonnes_list.includes(letter)) {
                consonnes += letter
            }
        }
        return consonnes
    }

    async get_number_of_consonnes(word: string) {
        let count = 0
        for (let letter of word) {
            if (this.consonnes_list.includes(letter)) {
                count++
            }
        }
        return count
    }

    async get_unique_consonnes_from_word(word: string) {
        let consonnes: string = ''
        for (let letter of word) {
            if (this.consonnes_list.includes(letter)) {
                if (!consonnes.includes(letter)) {
                    consonnes += letter
                }
            }
        }
        return consonnes
    }

    // we create a function to check if the word have 2 same letters in a row
    async check_two_letters_rows(word: string) {
        let ccount = 0
        for (let i = 0; i < word.length; i++) {
            if (word[i] == word[i + 1]) {
                ccount++
            }
        }
        if (ccount > 0) {
            return await this.get_letter_repeated_in_row(word)
        } else {
            return "false"
        }
    }

    // we create a function to get the letter who is repeated in a row
    async get_letter_repeated_in_row(word: string) {
        let letter: string = ''
        for (let i = 0; i < word.length; i++) {
            if (word[i] == word[i + 1]) {
                letter = word[i]
            }
        }
        return letter
    }

    // We want to create a function to check if a second time a letter is repeated in a row
    // we want to get the letter who is repeated in a row the second time
    async check_two_letters_rows_second_time(word: string) {
        let countts = 0
        for (let i = 0; i < word.length; i++) {
            if (word[i] == word[i + 1]) {
                countts++
            }
        }
        if (countts > 1) {
            return await this.get_letter_repeated_in_row_second_time(word)
        } else {
            return "false"
        }
    }

    // we create a function to get the letter who is repeated in a row the second time
    async get_letter_repeated_in_row_second_time(word: string) {
        let letter: string = ''
        let coount = 0
        for (let i = 0; i < word.length; i++) {
            if (word[i] == word[i + 1]) {
                coount++
            }
            if (coount == 2) {
                letter = word[i]
            }
        }
        return letter
    }

    // create a function to get the first letter of the word
    async get_first_letter(word: string) {
        return word[0]
    }
}