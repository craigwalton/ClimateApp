import './ShortwaveArrows.css';

const ShortwaveArrows = ({x, y, scattered, reflected, atmosphere}) => {

    const data = drawArrow(scattered, reflected, atmosphere);
    return (
        <div className="label-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="500" height="500" viewBox="-300 -60 600 600">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(240,210,161)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(235,195,128)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path d={data}/>
                <path d="M 0 -40
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
    console.log(scatteredValue, reflectedValue, atmosphereValue, absorbedSurfaceValue);
    const scatteredRIn = 80;
    const scatteredROut = scatteredRIn + scatteredValue;
    const scatteredZ = 100;
    const reflectedZ = 300;
    const reflectedRIn = scatteredROut;
    const reflectedROut = reflectedRIn + reflectedValue;
    const absorbedSurfaceZ = 400;
    const atmosphereZ = 200;
    const atmosphereX = 80;
    const atmosphereROut = 50;
    const atmosphereRIn = atmosphereROut - atmosphereValue;
    const arrowWidth = 5;
    let data = `
            M 0 0
            l 0 ${scatteredZ}
            a ${scatteredRIn} ${scatteredRIn} 0 0 1 ${-scatteredRIn * 2} 0
            l 0 ${-scatteredZ}`;
    // Reflected arrow head.
    const reflectedArrow = (scatteredValue + reflectedValue) / 2 + arrowWidth;
    data += `
            l ${arrowWidth} 0
            l ${-reflectedArrow} ${-reflectedArrow}
            l ${-reflectedArrow} ${reflectedArrow}
            l ${arrowWidth} 0`;
    data += `
            l 0 ${reflectedZ}
            a ${reflectedROut} ${reflectedROut} 0 0 0 ${reflectedROut * 2} 0
            L ${reflectedValue + scatteredValue} ${absorbedSurfaceZ}`;
    // Absorbed surface arrow head.
    const absorbedSurfaceArrow = (absorbedSurfaceValue) / 2 + arrowWidth;
    data += `
            l ${-arrowWidth} 0
            l ${absorbedSurfaceArrow} ${absorbedSurfaceArrow}
            l ${absorbedSurfaceArrow} ${-absorbedSurfaceArrow}
            l ${-arrowWidth} 0`;
    data += `
            L ${reflectedValue + scatteredValue + absorbedSurfaceValue} ${atmosphereZ}
            a ${atmosphereROut} ${atmosphereROut} 0 0 0 ${atmosphereROut} ${atmosphereROut}
            l ${atmosphereX} 0`;
    // Absorbed atmosphere arrow head.
    const absorbedAtmosphereArrow = (atmosphereValue) / 2 + arrowWidth;
    data += `
            l 0 ${arrowWidth}
            l ${absorbedAtmosphereArrow} ${-absorbedAtmosphereArrow}
            l ${-absorbedAtmosphereArrow} ${-absorbedAtmosphereArrow}
            l 0 ${arrowWidth}`;
    data += `
            l ${-atmosphereX} 0
            a ${atmosphereRIn} ${atmosphereRIn} 0 0 1 ${-atmosphereRIn} ${-atmosphereRIn}
            l 0 ${-atmosphereZ}
            Z`;
    // Inner / negative fill part.
    data += `
            M ${scatteredValue} ${scatteredZ}
            a ${scatteredROut} ${scatteredROut} 0 0 1 ${-scatteredROut * 2} 0
            l 0 ${reflectedZ - scatteredZ}
            a ${reflectedRIn} ${reflectedRIn} 0 0 0 ${reflectedRIn * 2} 0
            Z`;
    return data;
}

export default ShortwaveArrows;
