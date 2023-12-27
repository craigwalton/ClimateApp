import './Arrows.css'
import './LongwaveToSpaceArrow.css';
import {headStep, SvgDefs} from './Arrows';

const LongwaveToSpaceArrow = ({x, y, value}) => {

    const viewWidth = 120;
    const viewHeight = 210;
    const halfWidth = value / 2;
    const arrowHead = halfWidth + headStep;
    const arrowHeight = 100;
    const startY = 200;

    return (
        <div className="arrow-container" style={{left: x, top: y}}>
            <svg width={viewWidth} height={viewHeight} viewBox={`${-viewWidth / 2} 0 ${viewWidth} ${viewHeight}`}
                 style={{top: -100, left: -viewWidth / 2}}>
                <SvgDefs start="longwave-gradient-light" end="longwave-gradient-dark" id="longwave-to-space-gradient"/>
                <path className="longwave-to-space-path"
                      d={`M ${-halfWidth} ${startY}
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

export default LongwaveToSpaceArrow;
