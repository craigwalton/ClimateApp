import './BackRadiationArrow.css';

const BackRadiationArrow = ({x, y, value}) => {

    const halfWidth = value / 2;
    const step = 5;
    const arrowHead = halfWidth + 5;

    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="300" height="240" viewBox="-150 -50 300 240" style={{position: "relative", left: -150}}>
                <defs>
                    <linearGradient id="back-radiation-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className="longwave-gradient-dark"/>
                        <stop offset="100%" className="longwave-gradient-light"/>
                    </linearGradient>
                </defs>
                <path className="back-radiation-path"
                      d={`M ${-halfWidth} -30
                          l 0 110
                          l ${-step} 0
                          l ${arrowHead} ${arrowHead}
                          l ${arrowHead} ${-arrowHead}
                          l ${-step} 0
                          l 0 -110
                          Z`}/>
            </svg>
        </div>
    );
};

export default BackRadiationArrow;
