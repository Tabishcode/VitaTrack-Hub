
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Exercise = require('../models/exercise');
const ExerciseLog = require('../models/exerciseLog');

const loggedUserId = '6712b613abfb4ad85f770072';

router.use(express.urlencoded({ extended: true }));

router.get('/data', async (req, res) => {
    let { type } = req.query;
    // console.log("Request received for this type: ", type);
    try {
        let data = await Exercise.find({ type: type });
        res.json(data);
    } catch (error) {
        res.send(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        const { date, type, data, name } = req.body;
        const [day, month, year] = date.split('/');
        const dateObject = `${year}-${month}-${day}T00:00:00.000Z`;
        let details = await ExerciseLog.findOne({ userId: loggedUserId, date: dateObject });
        if (details) {
            if (type == 'Cardiovascular') {
                let id = await Exercise.findOne({ name: name }).select('_id');
                details.cardiovascular.push({ exerciseId: id, duration: data[0] });
                let response = await ExerciseLog.updateOne({ _id: details._id }, details);
            }
            else if (type == 'Strength') {
                let id = await Exercise.findOne({ name: name }).select('_id');
                details.strength.push({ exerciseId: id, sets: data[0], reps: data[1] });
                let response = await ExerciseLog.updateOne({ _id: details._id }, details);
            }
            else {
                res.send("Invalid type of exercise");
            }
        }
        else {  // no already tuple exist for this date and user
            if (type == 'Cardiovascular') {
                let id = await Exercise.findOne({ name: name }).select('_id');
                ExerciseLog.create({
                    userId: loggedUserId,
                    date: dateObject,
                    note: '',
                    strength: [],
                    cardiovascular: [{ exerciseId: id, duration: data[0] }]
                })
                .then( () => {
                    res.json({ message: "Success" });
                })
                .catch((err) => {
                    res.json({ message: "Error" });
                });
            }
            else if (type == 'Strength') {
                let id = await Exercise.findOne({ name: name }).select('_id');
                ExerciseLog.create({
                    userId: loggedUserId,
                    date: dateObject,
                    note: '',
                    strength: [{ exerciseId: id, sets: data[0], reps: data[1] }],
                    cardiovascular: []
                })
                .then( () => {
                    res.json({ message: "Success" });
                })
                .catch((err) => {
                    res.json({ message: "Error" });
                });
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.send(error);
    }
});

module.exports = router;