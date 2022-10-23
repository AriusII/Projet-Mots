import * as Cheerio from 'cheerio'
export class Main {
    site_url: string
    site_page_url: string
    words_data_list: any[]
    constructor() {
        this.site_url = "https://www.listesdemots.net/touslesmots.htm"
        this.site_page_url = "https://www.listesdemots.net/touslesmotspage2.htm"
        this.words_data_list = []
    }

    async start_process(url: string) {
        const body = await fetch(url).then(res => res.text())
        const words = await this.cheerio_process(body)
        let list_of_words: string[] = []
        for (let word of words) {
            list_of_words.push(word)
        }
        return list_of_words
    }

    async cheerio_process(body: string) {
        const $ = Cheerio.load(body)
        const words: string[] = $(".mot").map((i, el) => $(el).text().split(" ")).get()
        return words
    }
}