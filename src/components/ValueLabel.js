const ValueLabel = ({value, valueSuffix = "", label = ""}) => {

    const formattedValue = Math.round(value);
    const hasLabel = label !== "";

    return (
        <div>
            <label style={{display: hasLabel ? "block" : "none"}}>{label}</label>
            <b>{formattedValue + valueSuffix}</b>
        </div>
    );
};

export default ValueLabel;
