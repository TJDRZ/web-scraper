const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 8000;

const url = 'https://github.com/TJDRZ?tab=repositories'

axios(url)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);
        const repos = [];

        $('.wb-break-all', html).each(function() {
            const title = $(this).find('a').text().trim();
            const url = 'https://github.com' + $(this).find('a').attr('href')
            repos.push({title, url});
        });
        console.log(repos);
    }).catch(err => console.log(err));

app.listen(PORT, () => `Server is running on port ${PORT}`);
