import './ValueLabel.css';

const ValueLabel = ({x=0, y=0, value, valueSuffix="", label=""}) => {

    const formattedValue = Math.round(value);
    const hasLabel = label !== "";

    return (
        <div className="label-container" style={{position: 'absolute', left: x, top: y, width: 0}}>
            <div style={{width: 100, position: 'absolute', left: -50}}>
                <label style={{display: hasLabel ? "block" : "none"}}>{label}</label>
                <b>{formattedValue+valueSuffix}</b>
            </div>
        </div>
    );
};

export default ValueLabel;
