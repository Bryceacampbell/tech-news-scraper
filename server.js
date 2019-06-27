let express = require("express");
let exphbs = require("express-handlebars");
let app = express();
let mongoose = require("mongoose");
let logger = require("morgan");
let PORT = process.env.PORT || 3001;

// Mongoose Connection
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraperDB";
mongoose.connect(MONGODB_URI), { useNewUrlParser: true };

app.use(logger("dev"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/app/public"));

// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

require("./app/routes/api_routes")(app);

// The Server Starter
app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});