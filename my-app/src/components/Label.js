const Label = ({label, className = "black-label"}) => {
    return (
        <div className="label-container" style={{position: 'absolute', width: 0}}>
            <div style={{width: 100, position: 'absolute', left: -50}}>
                <label className={className}>{label}</label><br/>
            </div>
        </div>
    );
};

export default Label;
