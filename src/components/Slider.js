import './Slider.css';

const Slider = ({label, value, max = 100, onChange}) => {

    const handleSliderChange = (event) => {
        const valueInt = parseInt(event.target.value, 10);
        onChange(valueInt);
    };

    return (
        <div className="slider-container">
            <input type="range"
                   min="0"
                   max={max}
                   value={value}
                   onChange={handleSliderChange}
                   className="slider"/>
            <div>{label}</div>
        </div>
    );
};

export default Slider;
