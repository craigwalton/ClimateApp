import './Label.css';

const Label = ({x, y, label, value}) => {

    const formattedValue = Math.round(value);

    return (
        <div className="label-container" style={{position: 'absolute', left: x, top: y, width: 0}}>
            <div style={{width: 100, position: 'absolute', left: -50}}>
                <label>{label}</label><br/>
                <b>{formattedValue}</b>
            </div>
        </div>
    );
};

export default Label;
