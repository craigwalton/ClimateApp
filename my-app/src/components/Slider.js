import './Slider.css';

const Slider = ({x, y, label, value, onChange}) => {

    const handleSliderChange = (event) => {
        const valueInt = parseInt(event.target.value, 10);
        onChange(valueInt);
    };

    return (
        <div className="slider-container" style={{position: 'absolute', left: x, top: y}}>
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
