// start the CoreFunction when injected
setTimeout(CoreFunction, 1000);

// We want to create a function to use after the tab is injected
function CoreFunction(){
    let motus_grid = document.getElementsByClassName("motus-grid")[0];
    let [first_letter, word_length] = first_parse_logic(motus_grid);
    let good_letters = [];
    let bad_letters = [];
    create_html_divs();

    setInterval(function(){
        motus_grid = document.getElementsByClassName("motus-grid")[0];
        let live_grid = get_live_grid(motus_grid, word_length);
        [first_letter, word_length] = first_parse_logic(motus_grid);
        console.log("first_letter: " + first_letter);
        console.log("word_length: " + word_length);
        let [new_good_letters, new_bad_letters] = remove_duplicates_letters(check_live_letters(live_grid));
        let new_ends_word_letters = last_word_letters(live_grid);
        update_html_divs(first_letter, word_length, '', new_good_letters, new_bad_letters, '');
    }, 500);
}

function first_parse_logic(grid) {
    // we need to get the first div with the class name "cell-content"
    let first_cell_content = grid.getElementsByClassName("cell-content")[0];
    // we need to get the textContent of the first div with the class name "cell-content"
    let first_letter = first_cell_content.textContent;

    // we need to get the class style of the motus-grid element named "grid-template-columns"
    let grid_template_columns = grid.style.gridTemplateColumns;
    // we need the value of each repeat() in the grid-template-columns
    let word_length = parseInt(grid_template_columns.match(/\d+/)[0]);

    return [first_letter, word_length];
}

function get_live_grid(grid, word_length) {
    let live_grid = [];
    let cell_content = grid.getElementsByClassName("cell-content");
    for (var i = 0; i < 6; i++) {
        live_grid[i] = [];
        for (var j = 0; j < word_length; j++) {
            let cell = cell_content[i * word_length + j];
            if (cell) {
                let letter = cell.textContent;
                let style = cell.className;
                live_grid[i][j] = letter + "(" + style[style.length - 1] + ")";
            } else {
                live_grid[i][j] = 0;
            }
        }
    }
    return live_grid;
}

function check_live_letters(live_grid) {
    let good_letters = [];
    let bad_letters = [];
    for (var i = 0; i < live_grid.length; i++) {
        for (var j = 0; j < live_grid[i].length; j++) {
            let letter = live_grid[i][j];
            if (letter) {
                let style = letter[letter.length - 2];
                if (style == "r" || style == "y") {
                    good_letters.push(letter[0]);
                } else if (style == "-") {
                    bad_letters.push(letter[0]);
                }
            }
        }
    }
    return [good_letters, bad_letters];
}

function remove_duplicates_letters(letters) {
    let good_letters = letters[0];
    let bad_letters = letters[1];
    let unique_good_letters = [...new Set(good_letters)];
    let unique_bad_letters = [...new Set(bad_letters)];
    return [unique_good_letters, unique_bad_letters];
}

function get_ends_word_letters(live_grid) {
    let ends_word_letters = [];
    for (var i = 0; i < live_grid.length; i++) {
        for (var j = 0; j < live_grid[i].length; j++) {
            let letter = live_grid[i][j];
            if (letter) {
                let style = letter[letter.length - 2];
                if (style == "r") {
                    if (j == live_grid[i].length - 1) {
                        ends_word_letters.push(letter[0]);
                    }
                }
            }
        }
    }
    return ends_word_letters;
}

function last_word_letters(live_grid) {
    let last_word_letters = [];
    for (var i = 0; i < live_grid.length; i++) {
        for (var j = 0; j < live_grid[i].length; j++) {
            let letter = live_grid[i][j];
            if (letter) {
                let style = letter[letter.length - 2];
                if (style == "r") {
                    if (j == live_grid[i].length - 1) {
                        last_word_letters.push(letter[0]);
                    }
                }
            }
        }
    }
    for (var i = 0; i < live_grid.length; i++) {
        for (var j = 0; j < live_grid[i].length; j++) {
            let letter = live_grid[i][j];
            if (letter) {
                let style = letter[letter.length - 2];
                if (style == "r") {
                    if (j == live_grid[i].length - 2) {
                        last_word_letters.push(letter[0]);
                    }
                }
            }
        }
    }
    // we need to remove the duplicates letters and reverse the array
    let unique_last_word_letters = [...new Set(last_word_letters)];
    return unique_last_word_letters.reverse();
}

function create_html_divs() {
    // create the div with the class "word" after the <body>
    let body = document.getElementsByTagName("body")[0];
    let div = document.createElement("div");
    div.setAttribute("class", "myword");
    div.setAttribute("id", "idword");
    div.style.display = "none";
    body.appendChild(div);

    // create the div with the class "first_letter" inside the div with the class "word"
    let word = document.getElementsByClassName("myword")[0];
    let first_letter_div = document.createElement("div");
    first_letter_div.setAttribute("class", "first_letter");
    first_letter_div.innerHTML = '';
    word.appendChild(first_letter_div);

    // create the div with the class "word_length" inside the div with the class "word"
    let word_length_div = document.createElement("div");
    word_length_div.setAttribute("class", "word_length");
    word_length_div.innerHTML = '';
    word.appendChild(word_length_div);

    // create the div with the class "word_begin" inside the div with the class "word"
    let word_begin_div = document.createElement("div");
    word_begin_div.setAttribute("class", "word_begin");
    word_begin_div.innerHTML = '';
    word.appendChild(word_begin_div);

    // create the div with the class "good_letters" inside the div with the class "word"
    let good_letters_div = document.createElement("div");
    good_letters_div.setAttribute("class", "good_letters");
    good_letters_div.innerHTML = '';
    word.appendChild(good_letters_div);

    // create the div with the class "bad_letters" inside the div with the class "word"
    let bad_letters_div = document.createElement("div");
    bad_letters_div.setAttribute("class", "bad_letters");
    bad_letters_div.innerHTML = '';
    word.appendChild(bad_letters_div);

    // create the div with the class "word_end" inside the div with the class "word"
    let word_end_div = document.createElement("div");
    word_end_div.setAttribute("class", "word_end");
    word_end_div.innerHTML = '';
    word.appendChild(word_end_div);
}

function update_html_divs(first_letter, word_length, word_begin, good_letters, bad_letters, word_end) {
    // we search the div with the class "word"
    let word = document.getElementsByClassName("myword")[0];

    // we search the div with the class "first_letter" inside the div with the class "word"
    let first_letter_div = word.getElementsByClassName("first_letter")[0];
    first_letter_div.innerHTML = first_letter;

    // we search the div with the class "word_length" inside the div with the class "word"
    let word_length_div = word.getElementsByClassName("word_length")[0];
    word_length_div.innerHTML = word_length;

    // we search the div with the class "word_begin" inside the div with the class "word"
    let word_begin_div = word.getElementsByClassName("word_begin")[0];
    word_begin_div.innerHTML = word_begin;

    // we search the div with the class "good_letters" inside the div with the class "word"
    let good_letters_div = word.getElementsByClassName("good_letters")[0];
    good_letters_div.innerHTML = good_letters;

    // we search the div with the class "bad_letters" inside the div with the class "word"
    let bad_letters_div = word.getElementsByClassName("bad_letters")[0];
    bad_letters_div.innerHTML = bad_letters;

    // we search the div with the class "word_end" inside the div with the class "word"
    let word_end_div = word.getElementsByClassName("word_end")[0];
    word_end_div.innerHTML = word_end;
}