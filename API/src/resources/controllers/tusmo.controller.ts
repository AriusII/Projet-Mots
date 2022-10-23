import * as TusmoModel from '../../models/tusmo/tusmo.model'
export const get = (req: any, res: { send: (arg0: string) => void }) => {
    res.send('This is my Tusmo API index page')
}

export const post = async (req: any, res: { send: (arg0: string) => void }) => {
    const first_letter: string = req.body.first_letter
    const word_length: number = req.body.word_length
    const good_letters: string[] = req.body.good_letters
    const bad_letters: string[] = req.body.bad_letters
    const word_begin: string[] = req.body.word_begin
    const word_end: string[] = req.body.word_end

    const sql = generate_sql_query(first_letter, word_length, good_letters, bad_letters, word_begin, word_end)
    console.log(sql);

    try {
        const result: any = await TusmoModel.find_word(sql)
        const words_list = result.map((word: { word: any; }) => word.word)
        res.send(words_list)
    } catch (error) {
        console.log(error);
    }
}

function generate_sql_query(first_letter: string, word_length: number, good_letters: string[], bad_letters: string[], word_begin: string[], word_end: string[]) {
    let sql_query = `SELECT word FROM words WHERE first_letter = '${first_letter}' AND word_length = ${word_length}`
    if (word_begin.length > 0) {
        sql_query += ` AND word LIKE ${word_begin + '%'}`
    }
    if (good_letters.length > 0) {
        for (let i = 0; i < good_letters.length; i++) {
            sql_query += ` AND word LIKE '%${good_letters[i]}%'`
        }
    }
    if (bad_letters.length > 0) {
        for (let i = 0; i < bad_letters.length; i++) {
            sql_query += ` AND word NOT LIKE '%${bad_letters[i]}%'`
        }
    }
    if (word_end.length > 0) {
        sql_query += ` AND word LIKE '%${word_end}'`
    }
    sql_query += ' ORDER BY c_unique DESC, v_unique DESC LIMIT 20;'
    return sql_query
}