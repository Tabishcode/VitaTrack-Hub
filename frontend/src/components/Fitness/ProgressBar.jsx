import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css'; // Import CSS file for styling

const ProgressBar = ({ props }) => {
    // Calculate the percentage
    const { progressValue, totalValue, color } = props;
    const percentage = (progressValue / totalValue) * 100;

    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color || '#76c7c0' // Default color
                }}
            />
            <span className="progress-text">{progressValue+'/'+totalValue}</span>
        </div>
    );
};

// PropTypes for type checking
// ProgressBar.propTypes = {
//     progressValue: PropTypes.number.isRequired,
//     totalValue: PropTypes.number.isRequired,
//     color: PropTypes.string,
// };

export default ProgressBar;
