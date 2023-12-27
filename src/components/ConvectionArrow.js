import './Arrows.css'
import './ConvectionArrow.css';
import { headStep } from './Arrows';

const ConvectionArrow = ({x, y, value}) => {

    const viewWidth = 120;
    const viewHeight = 200;
    const arrowHeight = 100;
    const halfWidth = value / 2;
    const arrowHead = halfWidth + headStep

    return (
        <div className="arrow-container" style={{left: x, top: y}}>
            <svg width={viewWidth} height={viewHeight}
                 viewBox={`${-viewWidth / 2} ${-viewHeight} ${viewWidth} ${viewHeight}`}
                style={{top: -viewHeight}}>
                <defs>
                    <linearGradient id="convection-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(92,199,179)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(103,180,139)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className="convection-path"
                      d={`M ${-halfWidth} 0
                          l 0 ${-arrowHeight}
                          l ${-headStep} 0
                          l ${arrowHead} ${-arrowHead}
                          l ${arrowHead} ${arrowHead}
                          l ${-headStep} 0
                          l 0 ${arrowHeight}
                          Z`}/>
            </svg>
        </div>
    );
};

export default ConvectionArrow;
