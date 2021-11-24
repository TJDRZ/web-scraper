const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8000;
const urls = [
  "https://github.com/TJDRZ?tab=repositories",
  "https://github.com/TJDRZ?after=Y3Vyc29yOnYyOpK5MjAyMS0wOS0xOFQxMzo1Njo0Mi0wNDowMM4X-AoS&tab=repositories",
];

app.get("/", (request, response) => {
  axios.all([axios(urls[0]), axios(urls[1])])
    .then(axios.spread((res1, res2) => {
      const repos = [];
      
      let $ = cheerio.load(res1.data);
      $(".wb-break-all", res1.data).each(function () {
        const title = $(this).find("a").text().trim();
        const url = "https://github.com" + $(this).find("a").attr("href");
        repos.push({ title, url });
      });

      $ = cheerio.load(res2.data);
      $(".wb-break-all", res2.data).each(function () {
        const title = $(this).find("a").text().trim();
        const url = "https://github.com" + $(this).find("a").attr("href");
        repos.push({ title, url });
      });

      response.json(repos);
    }))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => `Server is running on port ${PORT}`);
