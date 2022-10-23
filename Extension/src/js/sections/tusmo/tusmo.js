setInterval(() => {
    get_word_class();
}, 500);
async function get_word_class() {
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let word_class;
        try {
            // we do a chrome.scripting.executeScript to get an html element with an id : idword
            word_class = await chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: function() {
                    let word_infos = {
                        first_letter: document.querySelector('.first_letter').innerText,
                        word_length: document.querySelector('.word_length').innerText,
                        word_begin: document.querySelector('.word_begin').innerText,
                        good_letters: document.querySelector('.good_letters').innerText,
                        bad_letters: document.querySelector('.bad_letters').innerText,
                        word_end: document.querySelector('.word_end').innerText
                    }
                    return word_infos;
                }
            });
        } catch (e) {
            document.body.textContent = 'Cannot access page';
            return;
        }
        // we get the word_infos in the html page
        let word_infos = await word_class[0].result;
        // we rework the word_infos
        let [first_letter, word_length, word_begin_array, good_letters_array, bad_letters_array, word_end_array] = await rework_infos(word_infos);
        // we do a HTTP POST request to the API
        post_word_class(first_letter, word_length, word_begin_array, good_letters_array, bad_letters_array, word_end_array).then(async function(data) {
            // we put all the word in the <textarea> element
            put_word_in_textarea(data);
        });
    });
}

// create a function to work all the infos , data = word_infos
async function rework_infos(data) {
    const first_letter = data.first_letter;
    const word_length = data.word_length;
    const word_begin = data.word_begin;
    const good_letters = data.good_letters;
    const bad_letters = data.bad_letters;
    const word_end = data.word_end;

    return [first_letter, word_length, word_begin, good_letters, bad_letters, word_end];
}

// create a function who do a HTTP POST request to the API
async function post_word_class(first_letter, word_length, word_begin_array, good_letters_array, bad_letters_array, word_end_array) {
    const response = await fetch('http://82.64.190.33/tusmo/find', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_letter: first_letter,
            word_length: word_length,
            word_begin: word_begin_array,
            good_letters: good_letters_array,
            bad_letters: bad_letters_array,
            word_end: word_end_array
        })
    });
    let data = await response.json();
    return data
}

// create a function who put all the word in the html page of the <textarea> element with id : message-1
// put all the word in a string with a "," between each word and put the string in the <textarea> element
// each word need to be return at the line
async function put_word_in_textarea(data) {
    console.log('On charge les mots dans le textarea');
    let get_element = document.getElementById("message-1");
    let word = "";
    for (let i = 0; i < data.length; i++) {
        word += data[i] + ", ";
    }
    return get_element.value = word;
}