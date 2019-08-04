const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY;

async function sendMethod(name, reqBody) {

    const response = await fetch(`https://api.telegram.org/bot${API_KEY}/${name}`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },

        body: JSON.stringify(reqBody)

    });

    const jsonData = await response.json();
    return jsonData;

}

async function callback(sender, args, msg, gio) {

    const dbName = `./assets/${msg.chat.id}.db`;

    let response = '';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        done = true;
    }

    await db.loadDatabase((err) => {

        db.find({ id: args[0] }, (err, docs) => {

            if (docs.length < 1) {

                response = 'Quote not found!';
                console.log(`Sending response: ${response}`);
                sendMethod('sendMessage', {
                    chat_id: msg.chat.id,
                    text: response,
                    reply_to_message_id: msg.message_id
                }).then(res => {
                    if (!res.ok) {
                        console.error(res.description);
                    }
                }).catch(err => console.log(err));

            } else {

                const quote = docs[0];
                response = `(${quote.id})${quote.user_name}: ${quote.text}`;
                console.log(`Sending response: ${response}`);
                sendMethod('sendMessage', {
                    chat_id: msg.chat.id,
                    text: response,
                    reply_to_message_id: msg.message_id
                }).then(res => {
                    if (!res.ok) {
                        console.error(res.description);
                    }
                }).catch(err => console.log(err));

            }

        });

    });

    return null;

}

module.exports = callback;