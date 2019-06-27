// Our scraping tools
// Axios is a promised-based http library, similar to jQuery"s Ajax method
// It works on the client and on the server
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/scrape", function (req, res) {

        axios.get("https://www.technewsworld.com/").then(function (response) {

            let $ = cheerio.load(response.data);
            let dataObject = {};

            //push data into dataObject here
            $(".story-list").each(function (i, element) {

                console.log(element);

                db.Article.create(dataObject)

                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        })
            .catch(function (error) {
                console.log(error);
            });
        res.send("Complete");
    });

    app.get("/articles", function (req, res) {

        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        })
            .catch(function (error) {
                res.json(error);
            });
    });

    app.get("/articles/:id", function (req, res) {

        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (error) {
                res.json(error);
            });
    });

    app.post("/articles/:id", function (req, res) {

        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { note: dbNote._id },
                    { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (error) {
                res.json(error);
            });
    });

    app.delete("/articles/:id", function (req, res) {

        db.Note.deleteOne(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { note: dbNote._id },
                    { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (error) {
                res.json(error);
            });
    });


};