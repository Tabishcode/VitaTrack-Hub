
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let valuesSchema = new Schema({
    Monday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Tuesday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Wednesday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Thursday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Friday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Saturday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    },
    Sunday: {
        type: Schema.Types.ObjectId,
        ref: 'dayplan'
    }
});

let timetableSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    values: {
        type: valuesSchema,
        required: true
    }
});

let Timetable = mongoose.model("timetable", timetableSchema);
module.exports = Timetable;