
const mongoose = require("mongoose")
const Schema = mongoose.Schema

let foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    proteins: {
        type: Number
    },
    carbs: {
        type: Number
    },
    fats: {
        type: Number
    },
    sugars: {
        type: Number
    }
})

let Food = mongoose.model("food", foodSchema)
module.exports = Food