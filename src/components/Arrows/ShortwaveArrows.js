import './Arrows.css'
import './ShortwaveArrows.css';
import {headStep, SvgDefs} from './Arrows';

const ShortwaveArrows = ({x, y, scattered, reflected, atmosphere}) => {

    const viewWidth = 500;
    const viewHeight = 600;
    const halfIncoming = 50;
    const incomingArrowHeight = 65;

    return (
        <div className="arrow-container" style={{left: x, top: y}}>
            <svg width={viewWidth} height={viewHeight} viewBox={`${-viewWidth / 2} -100 ${viewWidth} ${viewHeight}`}>
                <SvgDefs start="shortwave-light" end="shortwave-dark" id="shortwave-gradient"/>
                <path className="shortwave-path"
                      d={drawArrows(scattered, reflected, atmosphere)}/>
                <path className="shortwave-path"
                      d={`M 0 ${-incomingArrowHeight}
                          l 0 ${incomingArrowHeight}
                          l ${-headStep} 0
                          l ${halfIncoming + headStep} ${halfIncoming}
                          l ${halfIncoming + headStep} ${-halfIncoming}
                          l ${-headStep} 0
                          l 0 ${-incomingArrowHeight}
                          Z`}/>
            </svg>
        </div>
    );
};

function drawArrows(scattered, reflected, atmosphere) {
    if (scattered == null || reflected == null || atmosphere == null) {
        return "";
    }
    const absorbedSurfaceValue = 100 - scattered - reflected - atmosphere;
    const scatteredRIn = 70;
    const scatteredROut = scatteredRIn + scattered;
    const scatteredY = 60;
    const reflectedY = 400;
    const reflectedRIn = scatteredROut;
    const reflectedROut = reflectedRIn + reflected;
    const absorbedSurfaceY = 400;
    const atmosphereX = 120;
    const atmosphereY = 200;
    const atmosphereROut = 50;
    const atmosphereRIn = atmosphereROut - atmosphere;
    let path = `
               M 0 0
               l 0 ${scatteredY}
               a ${scatteredRIn} ${scatteredRIn} 0 0 1 ${-scatteredRIn * 2} 0
               l 0 ${-scatteredY}`;
    // Reflected arrow head.
    const reflectedArrow = (scattered + reflected) / 2 + headStep;
    path += `
            l ${headStep} 0
            l ${-reflectedArrow} ${-reflectedArrow}
            l ${-reflectedArrow} ${reflectedArrow}
            l ${headStep} 0`;
    path += `
            l 0 ${reflectedY - reflectedROut}
            a ${reflectedROut} ${reflectedROut} 0 0 0 ${reflectedROut * 2} 0
            L ${reflected + scattered} ${absorbedSurfaceY}`;
    // Absorbed surface arrow head.
    const absorbedSurfaceArrow = (absorbedSurfaceValue) / 2 + headStep;
    path += `
            l ${-headStep} 0
            l ${absorbedSurfaceArrow} ${absorbedSurfaceArrow}
            l ${absorbedSurfaceArrow} ${-absorbedSurfaceArrow}
            l ${-headStep} 0`;
    path += `
            L ${reflected + scattered + absorbedSurfaceValue} ${atmosphereY + atmosphere / 2 - atmosphereROut}
            a ${atmosphereROut} ${atmosphereROut} 0 0 0 ${atmosphereROut} ${atmosphereROut}
            L ${atmosphereX + 50} ${atmosphereY + atmosphere / 2}`;
    // Absorbed atmosphere arrow head.
    const atmosphereArrow = (atmosphere) / 2 + headStep;
    path += `
            l 0 ${headStep}
            l ${atmosphereArrow} ${-atmosphereArrow}
            l ${-atmosphereArrow} ${-atmosphereArrow}
            l 0 ${headStep}`;
    if (atmosphereRIn > 0) {
        path += `
                L ${100 + atmosphereRIn} ${atmosphereY - atmosphere / 2}
                a ${atmosphereRIn} ${atmosphereRIn} 0 0 1 ${-atmosphereRIn} ${-atmosphereRIn}`;
    } else {
        path += `L 100 ${atmosphereY - atmosphere / 2}`;
    }
    path += `
            L 100 0
            Z`;
    // Inner / negative fill part.
    path += `
            M ${scattered} ${scatteredY}
            a ${scatteredROut} ${scatteredROut} 0 0 1 ${-scatteredROut * 2} 0
            l 0 ${reflectedY - reflectedROut - scatteredY}
            a ${reflectedRIn} ${reflectedRIn} 0 0 0 ${reflectedRIn * 2} 0
            Z`;
    return path;
}

export default ShortwaveArrows;
