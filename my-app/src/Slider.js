import React, { useState } from 'react';
import './Slider.css'; // Create this file for styling

const Slider = () => {
    const [value, setValue] = useState(50); // Initial value

    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="slider-container">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleSliderChange}
            />
            <p>Value: {value}</p>
        </div>
    );
};

export default Slider;
