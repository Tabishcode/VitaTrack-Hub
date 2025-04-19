
import React, { useState, useEffect } from 'react'
import DisplayExercise from './DisplayExercise';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Table from './Table.jsx'
import './FitnessDiary.css'

const App = () => {
    let d = new Date();
    const [date, setDate] = useState(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    const [logs, setLogs] = useState({
        exerciseId: {
            name: ''
        },
        strength: [],
        cardiovascular: [],
        _id: '',
        note: '',
        date: ''
    });

    const fetchLogs = async () => {
        try {
            const d = new Date(date);
            const response = await fetch(`/api/user/exercise?date=${d.toLocaleDateString('en-GB')}`); // Replace with your API endpoint
            const jsonData = await response.json();
            // {console.log("JSON", jsonData)}
            if (jsonData != []) {
                setLogs({ ...jsonData });
            }
            else {                
                setLogs({...{
                    strength: [{exerciseId: {
                        name: ''
                    }}],
                    cardiovascular: [{exerciseId: {
                        name: ''
                    }}],
                    _id: '',
                    note: '',
                    date: ''
                }});
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [date]);

    function handlePrev() {
        let nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() - 1);
        setDate(nextDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
    function handleNext() {
        let nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setDate(nextDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
    return (
        <>
            {/* <h1>Fitness Diary</h1> */}
            <div className="horAdd">
                <img src='/assets/h1.png' alt='Fitness' />
            </div>
            <div className="calendar">
                <h1>Your Exercise Diary for:</h1>
                <div className="date_controls">
                    <button className="prev" onClick={handlePrev}>
                        <ArrowBackIosIcon style={{color: 'white'}} />
                    </button>
                    <p className='date'>{date}</p>
                    <button className="next" onClick={handleNext}>
                        <ArrowForwardIosIcon style={{color: 'white'}}/>
                    </button>
                </div>
            </div>
            <div className='space'> </div>
            <div className="mid">
                <div className="cardivasular">
                    <DisplayExercise {...{
                        key: 789,
                        name: "Cardiovascular",
                        options: ['Minutes', 'Calories Burned'],
                        data: logs.cardiovascular,
                        date: date,
                        refresh: fetchLogs
                    }} />
                    <br />
                    <DisplayExercise {...{
                        key: 267,
                        name: "Strength Training",
                        options: ['Sets', 'Reps', 'Calories Burned'],
                        data: logs.strength,
                        date: date
                    }} />
                    <form className='formNote'>
                        <div className="top">
                            <h3>Today's Exercise Note</h3>
                            <button id="noteBtn" type='submit'>Edit Note</button>
                        </div>
                        <textarea className='noteText' value={logs.note}></textarea>
                    </form>
                </div>
                <div className="addv">
                    <img src="/assets/v2.png" alt="Fitness Advertisement" />
                </div>
            </div>
            <div className="horAdd">
                <img src="/assets/h2.png" alt="Fitness Advertisement" />
            </div>
        </>
    );
};

export default App;
