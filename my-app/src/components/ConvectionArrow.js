import './ConvectionArrow.css';

const ConvectionArrow = ({x, y, value}) => {

    const halfWidth = value / 2;
    const step = 5;
    const arrowHead = halfWidth + 5;
    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="120" height="200" viewBox="-60 -200 120 200" style={{position: "relative", left: -40}}>
                <defs>
                    <linearGradient id="grad-convection" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(161,240,231)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(70,128,112)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className={"convection-path"}
                      d={`M ${-halfWidth} 0
                          l 0 -100
                          l ${-step} 0
                          l ${arrowHead} ${-arrowHead}
                          l ${arrowHead} ${arrowHead}
                          l ${-step} 0
                          l 0 100
                          Z`}/>
            </svg>
        </div>
    );
};

export default ConvectionArrow;
