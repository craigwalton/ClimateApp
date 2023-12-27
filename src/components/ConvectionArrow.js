import './Arrows.css'
import './ConvectionArrow.css';
import {headStep, SvgDefs} from './Arrows';

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
                <SvgDefs start="convection-light" end="convection-dark" id="convection-gradient"/>
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
