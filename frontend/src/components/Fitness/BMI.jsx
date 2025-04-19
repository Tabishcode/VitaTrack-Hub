
import React from 'react'
import './BMI.css'

const BMI = () => {
    return (
        <div className='containerBMI'>
            <div className="bar">
                <div className="ball"></div>
            </div>
            <div className="title">
                <h3>BMI Value</h3>
            </div>
            <div className="upper-limit">40</div>
            <div className="lower-limit">15</div>
        </div>
    )
};

export default BMI;