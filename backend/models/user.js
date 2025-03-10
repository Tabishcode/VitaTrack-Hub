
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather Not Say'],
    },
    goal: {
        type: String,
        enum: ['lose', 'gain', 'maintain'],
    },
    calories: Number,
});

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model("user", userSchema);
module.exports = User;