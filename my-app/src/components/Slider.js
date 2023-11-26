import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ x, y, label }) => {
    const [value, setValue] = useState(50);

    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="slider-container" style={{ position: 'absolute', left: x, top: y }}>
            <label>{label}</label><br/>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleSliderChange}
            /><br/>
            <b>{value}</b>
        </div>
    );
};

export default Slider;
