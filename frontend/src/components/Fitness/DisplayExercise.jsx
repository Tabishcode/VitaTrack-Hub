import React, { useState, useEffect } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PopupSearch from './PopupSearch'

function createRow(desc, perUnit, p1, p2) {
    let details;
    if (p2) {
        details = [p1, p2, p1 * p2 * perUnit];
    }
    else {
        details = [p1, p1 * perUnit]
    }
    return { desc, details };
}

const DisplayExercise = ({ name, options, data, date, refresh }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    function openPopup() {
        setIsPopupVisible(true);
    }
    function closePopup() {
        setIsPopupVisible(false);
    }
    async function setExercise(exercise) {
        if (options.length == 2) {
            let d = new Date(date);
            date = d.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric',});
            let duration = Number(prompt("Enter the duration in minutes"));
            if (Number.isInteger(duration)) {
                try {
                    const response = await fetch('api/exercise/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        body: JSON.stringify(
                        {
                            date: date,
                            type: 'Cardiovascular', 
                            name: exercise, 
                            data: [duration]
                        }), 
                    });

                    // Handle the response
                    if (response.ok) {
                        const jsonResponse = await response.json();
                        console.log("Response:", jsonResponse);
                    } else {
                        console.log("Error:", response.statusText);
                    }
                } catch (error) {
                    console.error('Request failed', error);
                }
            }
            else {
                alert("Please enter a valid number");
            }
        }
        else {
            let d = new Date(date);
            date = d.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric',});
            let sets = Number(prompt("Enter the number of sets"));
            let reps = Number(prompt("Enter the number of repetitions"));
            if (Number.isInteger(sets) && Number.isInteger(reps)) {
                try {
                    const response = await fetch('api/exercise/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        body: JSON.stringify({date: date, type: 'Strength', name: exercise, data: [sets, reps]}), 
                    });

                    // Handle the response
                    if (response.ok) {
                        const jsonResponse = await response.json();
                        console.log("Response:", jsonResponse);
                    } else {
                        console.log("Error:", response.statusText);
                    }
                } catch (error) {
                    console.error('Request failed', error);
                }
            }
            else {
                alert("Please enter a valid numbers");
            }
        }
        refresh();
    }

    const [rows, setRows] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);          // will use database
    useEffect(() => {
        setRows([]);
        if (options.length == 3) {
            setDailyData([0, 0, 0]);
        }
        else {
            setDailyData([0, 0]);
        }
        if (data && data.length) {
            if (data[0].duration) { // cardiovascular
                let dd = [0, 0];
                let refinedData = data.map(el => {
                    let r = createRow(el.exerciseId.name, el.exerciseId.calories_per_unit, el.duration);
                    dd[0] += r.details[0];
                    dd[1] += r.details[1];
                    return r;
                });
                setDailyData(dd);
                setRows(refinedData);
            }
            else {
                let dd = [0, 0, 0]
                let refinedData = data.map(el => {
                    let r = createRow(el.exerciseId.name, el.exerciseId.calories_per_unit, el.sets, el.reps);
                    dd[0] += r.details[0];
                    dd[1] += r.details[1];
                    dd[2] += r.details[2];
                    return r;
                });
                setDailyData(dd);
                setRows(refinedData);
            }
        }
    }, [data]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow key={321}>
                            <td className="title">{name}</td>
                            {
                                options.map((el, index) => (
                                    <TableCell className='btn text-center' key={index} align="right">{el}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                {row.details.map((el, index) => (
                                    <TableCell key={index} align="right">{el}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><button onClick={openPopup}> + Add Exercise </button></TableCell>
                            {isPopupVisible &&
                                <PopupSearch
                                    onClose={closePopup}
                                    type={options.length == 2 ? 'Cardiovascular' : 'Strength'}
                                    onAdd={setExercise}
                                />}
                        </TableRow>
                        <TableRow>
                            <td className='bold' colSpan={1} align='right'>Daily Total</td>
                            {
                                dailyData.map((el, index) => (
                                    <td className='boldBack' key={index} align="right">{el.toFixed(2)}</td>
                                ))
                            }
                        </TableRow>
                        <TableRow>
                            <td className='bold' colSpan={1} align='right'>Weekly Total</td>
                            {
                                dailyData.map((el, index) => (
                                    <td className='boldBack' key={index} align="right">{el.toFixed(2)}</td>
                                ))
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default DisplayExercise