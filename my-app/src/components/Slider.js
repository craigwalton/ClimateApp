import './Slider.css';

const Slider = ({x, y, label, value, onChange, hideLabel=false}) => {

    const handleSliderChange = (event) => {
        const valueInt = parseInt(event.target.value, 10);
        onChange(valueInt);
    };

    var labelDisplay = hideLabel ? 'none' : 'block';
    return (
        <div className="slider-container" style={{position: 'absolute', left: x, top: y, width: 0}}>
            <div style={{width: 130, position: 'absolute', left: -65}}>
                <div style={{height: 20, marginTop: 10, display: labelDisplay}}>
                    <b>{value}</b>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleSliderChange}
                    style={{width: '100%'}}
                />
                <div>{label}</div>
            </div>
        </div>
    );
};

export default Slider;
