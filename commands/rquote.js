const Datastore = require('nedb');

async function callback(sender, args, msg) {

    const dbName = `${msg.chat.id}.db`;
    const db = new Datastore(dbName);

    let response = 'No quote found for that user!';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        return response;
    }

    db.loadDatabase((err) => {

        db.find({ user_name: args[0] }, (err, docs) => {

            if (docs.length < 1) {

                response = 'No quote found for that user!';
                return response;

            } else {

                const quote = docs[Math.floor(Math.random() * docs.length)];
                response = `(${quote.id})${quote.user_name}: ${quote.text}`;
                return response;

            }

        });

    });

    return response;

}

module.exports = callback;