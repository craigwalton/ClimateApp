import './ShortwaveArrows.css';

const ShortwaveArrows = ({x, y, scattered, reflected, atmosphere}) => {
    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="500" height="600" viewBox="-250 -100 500 600">
                <defs>
                    <linearGradient id="shortwave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(220,188,111)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(218,166,98)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className={"shortwave-path"}
                      d={drawArrow(scattered, reflected, atmosphere)}/>
                <path className={"shortwave-path"}
                      d="M 0 -40
                         l 0 40
                         l -10 0
                         l 60 50
                         l 60 -50
                         l -10 0
                         l 0 -40
                         Z"/>
            </svg>
        </div>
    );
};

function drawArrow(scattered, reflected, atmosphere) {
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
    const step = 10;
    let data = `
               M 0 0
               l 0 ${scatteredY}
               a ${scatteredRIn} ${scatteredRIn} 0 0 1 ${-scatteredRIn * 2} 0
               l 0 ${-scatteredY}`;
    // Reflected arrow head.
    const reflectedArrow = (scattered + reflected) / 2 + step;
    data += `
            l ${step} 0
            l ${-reflectedArrow} ${-reflectedArrow}
            l ${-reflectedArrow} ${reflectedArrow}
            l ${step} 0`;
    data += `
            l 0 ${reflectedY - reflectedROut}
            a ${reflectedROut} ${reflectedROut} 0 0 0 ${reflectedROut * 2} 0
            L ${reflected + scattered} ${absorbedSurfaceY}`;
    // Absorbed surface arrow head.
    const absorbedSurfaceArrow = (absorbedSurfaceValue) / 2 + step;
    data += `
            l ${-step} 0
            l ${absorbedSurfaceArrow} ${absorbedSurfaceArrow}
            l ${absorbedSurfaceArrow} ${-absorbedSurfaceArrow}
            l ${-step} 0`;
    data += `
            L ${reflected + scattered + absorbedSurfaceValue} ${atmosphereY + atmosphere / 2 - atmosphereROut}
            a ${atmosphereROut} ${atmosphereROut} 0 0 0 ${atmosphereROut} ${atmosphereROut}
            L ${atmosphereX + 50} ${atmosphereY + atmosphere / 2}`;
    // Absorbed atmosphere arrow head.
    const atmosphereArrow = (atmosphere) / 2 + step;
    data += `
            l 0 ${step}
            l ${atmosphereArrow} ${-atmosphereArrow}
            l ${-atmosphereArrow} ${-atmosphereArrow}
            l 0 ${step}`;
    if (atmosphereRIn > 0) {
        data += `
                L ${100 + atmosphereRIn} ${atmosphereY - atmosphere / 2}
                a ${atmosphereRIn} ${atmosphereRIn} 0 0 1 ${-atmosphereRIn} ${-atmosphereRIn}`;
    } else {
        data += `L 100 ${atmosphereY - atmosphere / 2}`;
    }
    data += `
            L 100 0
            Z`;
    // Inner / negative fill part.
    data += `
            M ${scattered} ${scatteredY}
            a ${scatteredROut} ${scatteredROut} 0 0 1 ${-scatteredROut * 2} 0
            l 0 ${reflectedY - reflectedROut - scatteredY}
            a ${reflectedRIn} ${reflectedRIn} 0 0 0 ${reflectedRIn * 2} 0
            Z`;
    return data;
}

export default ShortwaveArrows;
