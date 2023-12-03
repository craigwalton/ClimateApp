import './ShortwaveArrows.css';

const ShortwaveArrows = ({x, y, scattered, reflected, atmosphere}) => {

    const data = drawArrow(scattered, reflected, atmosphere);
    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="500" height="500" viewBox="-300 -60 600 600">
                <defs>
                    <linearGradient id="shortwave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(240,210,161)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(235,195,128)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className={"shortwave-path"}
                      d={data}/>
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

function drawArrow(scatteredValue, reflectedValue, atmosphereValue) {
    if (isNaN(scatteredValue) || isNaN(reflectedValue) || isNaN(atmosphereValue)) {
        return '';
    }
    const absorbedSurfaceValue = 100 - scatteredValue - reflectedValue - atmosphereValue;
    const scatteredRIn = 80;
    const scatteredROut = scatteredRIn + scatteredValue;
    const scatteredZ = 100;
    const reflectedZ = 400;
    const reflectedRIn = scatteredROut;
    const reflectedROut = reflectedRIn + reflectedValue;
    const absorbedSurfaceZ = 400;
    const atmosphereZ = 200;
    const atmosphereX = 160;
    const atmosphereROut = 50;
    const atmosphereRIn = atmosphereROut - atmosphereValue;
    const step = 5;
    let data = `
            M 0 0
            l 0 ${scatteredZ}
            a ${scatteredRIn} ${scatteredRIn} 0 0 1 ${-scatteredRIn * 2} 0
            l 0 ${-scatteredZ}`;
    // Reflected arrow head.
    const reflectedArrow = (scatteredValue + reflectedValue) / 2 + step;
    data += `
            l ${step} 0
            l ${-reflectedArrow} ${-reflectedArrow}
            l ${-reflectedArrow} ${reflectedArrow}
            l ${step} 0`;
    data += `
            l 0 ${reflectedZ - reflectedROut}
            a ${reflectedROut} ${reflectedROut} 0 0 0 ${reflectedROut * 2} 0
            L ${reflectedValue + scatteredValue} ${absorbedSurfaceZ}`;
    // Absorbed surface arrow head.
    const absorbedSurfaceArrow = (absorbedSurfaceValue) / 2 + step;
    data += `
            l ${-step} 0
            l ${absorbedSurfaceArrow} ${absorbedSurfaceArrow}
            l ${absorbedSurfaceArrow} ${-absorbedSurfaceArrow}
            l ${-step} 0`;
    data += `
            L ${reflectedValue + scatteredValue + absorbedSurfaceValue} ${atmosphereZ}
            a ${atmosphereROut} ${atmosphereROut} 0 0 0 ${atmosphereROut} ${atmosphereROut}
            l ${atmosphereX - absorbedSurfaceValue} 0`;
    // Absorbed atmosphere arrow head.
    const atmosphereArrow = (atmosphereValue) / 2 + step;
    data += `
            l 0 ${step}
            l ${atmosphereArrow} ${-atmosphereArrow}
            l ${-atmosphereArrow} ${-atmosphereArrow}
            l 0 ${step}`;
    if (atmosphereRIn > 0) {
        data += `
                l ${-atmosphereX + absorbedSurfaceValue} 0
                a ${atmosphereRIn} ${atmosphereRIn} 0 0 1 ${-atmosphereRIn} ${-atmosphereRIn}
                l 0 ${-atmosphereZ}`;
    } else {
        data += `
                l ${-atmosphereX + absorbedSurfaceValue - atmosphereRIn} 0
                l 0 ${-atmosphereZ - atmosphereRIn}`;
    }
    data += `Z`;
    // Inner / negative fill part.
    data += `
            M ${scatteredValue} ${scatteredZ}
            a ${scatteredROut} ${scatteredROut} 0 0 1 ${-scatteredROut * 2} 0
            l 0 ${reflectedZ - reflectedROut - scatteredZ}
            a ${reflectedRIn} ${reflectedRIn} 0 0 0 ${reflectedRIn * 2} 0
            Z`;
    return data;
}

export default ShortwaveArrows;
