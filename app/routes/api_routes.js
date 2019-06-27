// Our scraping tools
// Axios is a promised-based http library, similar to jQuery"s Ajax method
// It works on the client and on the server
let axios = require("axios");
let cheerio = require("cheerio");

module.exports = function (app) {
    
    app.get("/scrape", function (req, res) {

        axios.get("http://www.echojs.com/").then(function (response) {

            let $ = cheerio.load(response.data);

            $(".title").each(function (i, element) {
            

                var title = $(element).children("a").text();
                var link = $(element).children("a").attr("href");
          
                console.log(title);
                console.log(link);
                console.log("--------------------")

            });
        });
    });
};