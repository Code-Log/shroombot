const fetch = require('node-fetch');
const api_url = 'https://wordsapiv1.p.rapidapi.com';

async function callback(sender, args) {

    if (args.length < 1) {
        return 'Not enough arguments!';
    }

    const search = args[0];

    const response = await fetch(`${api_url}/words/${search}/definitions`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    });

    const data = await response.json();
    const definitions = data.definitions;

    let result = '';

    for (let def of definitions) {

        result += `${search} - ${def.partOfSpeech}:\n\n`;
        result += `${def.definition}\n\n`

    }

    return result;

}

module.exports = callback;