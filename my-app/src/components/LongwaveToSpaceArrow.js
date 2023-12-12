import './LongwaveToSpaceArrow.css';

const LongwaveToSpaceArrow = ({x, y, value}) => {

    const halfWidth = value / 2;
    const step = 5;
    const arrowHead = halfWidth + 5;
    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="120" height="200" viewBox="-60 0 120 200" style={{position: "relative", left: -60}}>
                <defs>
                    <linearGradient id="longwave-to-space-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(228,122,106)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(197,141,128)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className={"longwave-to-space-path"}
                      d={`M ${-halfWidth} 200
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

export default LongwaveToSpaceArrow;
