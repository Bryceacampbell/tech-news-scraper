let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    title: {
        type: String,
        required: true,
        validate: [
            function (input) {
                return input.length <= 75;
            },
            "Maximum of 75 characters"
        ]
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
