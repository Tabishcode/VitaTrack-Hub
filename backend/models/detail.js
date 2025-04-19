
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Exercise = require('./exercise')

const detailSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather Not Say'],
        required: true
    },
    goal: {
        type: String,
        enum: ['lose', 'gain', 'maintain'],
        required: true
    },
    exerciseGoal: [{
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'exercise',
            required: true
        },
        totalValue: {
            type: Number,
            required: true
        },
        progressValue: {
            type: Number,
            default: 0
        }
    }],
    calories: Number,
});

const Detail = mongoose.model('detail', detailSchema);
module.exports = Detail;