import './ValueLabel.css';

const ValueLabel = ({value, valueSuffix="", label=""}) => {

    const formattedValue = Math.round(value);
    const hasLabel = label !== "";

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <label style={{display: hasLabel ? "block" : "none"}}>{label}</label>
                <b>{formattedValue+valueSuffix}</b>
            </div>
        </div>
    );
};

export default ValueLabel;
