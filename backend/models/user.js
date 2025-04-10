
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
        // required: true
    },
    height: {
        type: Number,
        // required: true
    },
    weight: {
        type: Number,
        // required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather Not Say'],
        // required: true
    },
    goal: {
        type: String,
        enum: ['lose', 'gain', 'maintain'],
        // required: true
    },
    calories: Number,
});

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model("user", userSchema);
module.exports = User;