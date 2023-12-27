import './Arrows.css';
import './BackRadiationArrow.css';
import { headStep } from './Arrows';

const BackRadiationArrow = ({x, y, value}) => {

    const viewWidth = 300;
    const viewHeight = 240;
    const halfWidth = value / 2;
    const arrowHead = halfWidth + headStep;
    const arrowHeight = 110;

    return (
        <div className="arrow-container" style={{left: x, top: y}}>
            <svg width={viewWidth} height={viewHeight} viewBox={`${-viewWidth / 2} -10 ${viewWidth} ${viewHeight}`}
                 style={{left: -viewWidth / 2, top: -arrowHeight - 10}}>
                <defs>
                    <linearGradient id="back-radiation-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className="longwave-gradient-dark"/>
                        <stop offset="100%" className="longwave-gradient-light"/>
                    </linearGradient>
                </defs>
                <path className="back-radiation-path"
                      d={`M ${-halfWidth} 0
                          l 0 ${arrowHeight}
                          l ${-headStep} 0
                          l ${arrowHead} ${arrowHead}
                          l ${arrowHead} ${-arrowHead}
                          l ${-headStep} 0
                          l 0 ${-arrowHeight}
                          Z`}/>
            </svg>
        </div>
    );
};

export default BackRadiationArrow;
