
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let valuesSchema = new Schema({
    breakfast: {
        type: Schema.Types.ObjectId,
        ref: 'food'
    },
    lunch: {
        type: Schema.Types.ObjectId,
        ref: 'food'
    },
    dinner: {
        type: Schema.Types.ObjectId,
        ref: 'food'
    },
    snacks: {
        type: Schema.Types.ObjectId,
        ref: 'food'
    }
});

let dayplanSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    values: {
        type: valuesSchema,
        required: true
    }
});

let Dayplan = mongoose.model("dayplan", dayplanSchema);
module.exports = Dayplan;