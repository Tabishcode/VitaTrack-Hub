
const mongoose = require('mongoose');

let exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    calories_per_unit: {
        type: Number,
        required: true
    }
});

let Exercise = mongoose.model('exercise', exerciseSchema);
module.exports = Exercise;