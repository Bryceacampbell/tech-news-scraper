let express = require("express");
let exphbs = require("express-handlebars");
let app = express();
let mongoose = require("mongoose");
// var path = require("path");
let PORT = process.env.PORT || 3000;
let bodyParser = require("body-parser");

// Mongoose Connection
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraperDB";
mongoose.connect(MONGODB_URI), { useNewUrlParser: true };

app.use(bodyParser.json());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/app/public"));
// app.use(express.static("public"));


// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    res.render("index");
});

require("./app/routes/api_routes")(app);

// The Server Starter
app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});