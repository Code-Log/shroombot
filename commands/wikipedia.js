const fetch = require('node-fetch');

const wiki_api_url = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

async function callback(sender, args) {

    if (args.length < 1) {
        return 'Not enough arguments!';
    }

    let searchString = '';
    args.forEach(arg => searchString += arg + '_');
    searchString = searchString.replace(' ', '_'); // Can never be too safe.
    searchString = searchString.substring(0, searchString.length - 2); // Chop of the last _

    const response = await fetch(wiki_api_url + searchString, {

        method: 'GET',
        header: {
            'Accepts': 'application/json'
        }

    });

    const data = await response.json();
    const title = data.displaytitle;
    const summary = data.extract;

    const link_desktop = data.content_urls.desktop.page;
    const link_mobile = data.content_urls.mobile.page;

    let result = title + '\n\n' + summary + '\n\n';
    result += `Desktop: ${link_desktop}\n`;
    result += `Mobile: ${link_mobile}`;

    return result;

}

module.exports = callback;