import React from 'react';
import ProgressBar from './ProgressBar'; // Make sure to import your ProgressBar component

const ExerciseList = ({data}) => {
    // console.log("The data is: ", data);

    for (const d of data) {
        d.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);   // adding random color
    }

    return (
        <div className="calories">
            {data.map((exercise, index) => (
                <div className="row" key={index}>
                    <p>{exercise.exerciseId.name}</p>
                    <ProgressBar props = {exercise} />
                </div>
            ))}
        </div>
    );
};

export default ExerciseList;
