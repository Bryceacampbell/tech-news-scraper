import { Schema as _Schema, model } from "mongoose";
let Schema = _Schema;

let NoteSchema = new Schema ({

    title: String,
    body: String

});

let Note = model("Note", NoteSchema);

export default Note;