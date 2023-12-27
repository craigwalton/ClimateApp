import './Arrows.css'
import './LongwaveFromSurfaceArrows.css';
import {headStep, SvgDefs} from './Arrows';

const LongwaveFromSurfaceArrows = ({x, y, emitted, absorbed, window}) => {

    const viewWidth = 300;
    const viewHeight = 450;
    const startX = 200 + window / 2;
    const mainArrow = drawArrows(startX, viewHeight, emitted, absorbed, window);
    const emittedArrow = (emitted) / 2 + headStep;
    const emittedArrowHeight = 70;

    return (
        <div className="arrow-container" style={{left: x, top: y}}>
            <svg width={viewWidth} height={viewHeight} viewBox={`-50 0 ${viewWidth} ${viewHeight}`}>
                <SvgDefs start="longwave-gradient-light" end="longwave-gradient-dark"
                         id="longwave-from-surface-gradient"/>
                <path className="longwave-from-surface-path"
                      d={mainArrow}/>
                <path className="longwave-from-surface-path"
                      d={`M ${startX} ${viewHeight}
                          l 0 ${-emittedArrowHeight}
                          l ${headStep} 0
                          l ${-emittedArrow} ${-emittedArrow}
                          l ${-emittedArrow} ${emittedArrow}
                          l ${headStep} 0
                          l 0 ${emittedArrowHeight}
                          Z`}/>
            </svg>
        </div>
    );
};

function drawArrows(startX, viewHeight, emitted, absorbed, window) {
    // Through window arrow.
    const windowArrow = window / 2 + headStep;
    const windowY = 400;
    let data = `M ${startX} ${viewHeight}
                l 0 ${-windowY}
                l ${headStep} 0
                l ${-windowArrow} ${-windowArrow}
                l ${-windowArrow} ${windowArrow}
                l ${headStep} 0`;
    // Absorbed arrow.
    const absorbedArrow = (absorbed) / 2 + headStep;
    const absorbedROut = 50;
    const absorbedRIn = absorbedROut - absorbed;
    const absorbedY = 250;
    const absorbedX = 60;
    data += `l 0 ${absorbedY - absorbed / 2}
             a ${absorbedROut} ${absorbedROut} 0 0 0 ${-absorbedROut} ${-absorbedROut}
             L ${absorbedX} ${absorbedY - absorbed / 2}
             l 0 ${-headStep}
             l ${-absorbedArrow} ${absorbedArrow}
             l ${absorbedArrow} ${absorbedArrow}
             l 0 ${-headStep}`;
    if (absorbedRIn > 0) {
        data += `L ${startX - emitted - absorbedRIn} ${absorbedY + absorbed / 2}
                 a ${absorbedRIn} ${absorbedRIn} 0 0 1 ${absorbedRIn} ${absorbedRIn}`;
    } else {
        data += `L ${startX - emitted} ${absorbedY + absorbed / 2}`;
    }
    data += `L ${startX - emitted} ${viewHeight}
             Z`;
    return data;
}

export default LongwaveFromSurfaceArrows;
