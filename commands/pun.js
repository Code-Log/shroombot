const fs = require('fs');

async function callback(sender, args) {

    const fileContents = fs.readFileSync('./assets/puns.json');
    const puns = JSON.parse(fileContents).puns;

    return puns[Math.floor(Math.random() * puns.length)];

}

module.exports = callback;