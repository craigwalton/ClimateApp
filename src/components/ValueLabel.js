const ValueLabel = ({value, valueSuffix = "", label = ""}) => {

    const formattedValue = Math.round(value);
    const hasLabel = label !== "";

    return (
        <div>
            <label style={{display: hasLabel ? "block" : "none"}}>{label}</label>
            <div style={{height: 21}}><b>{formattedValue + valueSuffix}</b></div>
        </div>
    );
};

export default ValueLabel;
