import './Label.css';

const Label = ({x, y, label, value}) => {

    return (
        <div className="label-container" style={{position: 'absolute', left: x, top: y}}>
            <label>{label}</label><br/>
            <b>{value}</b>
        </div>
    );
};

export default Label;
