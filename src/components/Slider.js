import './Slider.css';

const Slider = ({label, value, onChange, hideValue=false}) => {

    const handleSliderChange = (event) => {
        const valueInt = parseInt(event.target.value, 10);
        onChange(valueInt);
    };

    var labelDisplay = hideValue ? 'none' : 'block';
    return (
        <div className="slider-container">
            <div style={{width: 130, left: -65}}>
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
                    className={"slider"}
                />
                <div>{label}</div>
            </div>
        </div>
    );
};

export default Slider;
