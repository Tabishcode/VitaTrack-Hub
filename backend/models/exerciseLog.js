
const mongoose = require('mongoose');

let exerciseLogSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cardiovascular: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exercise',
                required: true
            },
            duration: {
                type: Number,
                required: true
            }
        }
    ],
    strength: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exercise',
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            }
        }
    ],
    note: String,
});

let ExerciseLog = mongoose.model('exerciseLog', exerciseLogSchema);
module.exports = ExerciseLog;