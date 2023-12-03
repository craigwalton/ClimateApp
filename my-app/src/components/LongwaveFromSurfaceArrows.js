import './LongwaveFromSurfaceArrows.css';

const LongwaveFromSurfaceArrows = ({x, y, emitted, absorbed, window}) => {

    const data = drawArrow(emitted, absorbed, window);
    const step = 5;
    const emittedArrow = (emitted) / 2 + step;
    console.log(emitted, absorbed, window);
    return (
        <div className="arrow-container" style={{position: 'absolute', left: x, top: y}}>
            <svg width="250" height="450" viewBox="0 0 250 450">
                <defs>
                    <linearGradient id="longwave-from-surface-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(187,77,93)', stopOpacity: 1}}/>
                        <stop offset="100%" style={{stopColor: 'rgb(157,66,114)', stopOpacity: 1}}/>
                    </linearGradient>
                </defs>
                <path className={"longwave-from-surface-path"}
                      d={data}/>
                <path className={"longwave-from-surface-path"}
                      d={`M ${200 + window / 2} 450
                          l 0 -40
                          l ${step} 0
                          l ${-emittedArrow} ${-emittedArrow}
                          l ${-emittedArrow} ${emittedArrow}
                          l ${step} 0
                          l 0 40
                          Z`}/>
            </svg>
        </div>
    );
};

function drawArrow(emitted, absorbed, window) {
    const step = 5;
    const height = 450;
    const startX = 200 + window / 2;
    // Through window arrow.
    const windowArrow = (window) / 2 + step;
    const windowY = 400;
    let data = `M ${startX} ${height}
                l 0 ${-windowY}
                l ${step} 0
                l ${-windowArrow} ${-windowArrow}
                l ${-windowArrow} ${windowArrow}
                l ${step} 0`;
    // Absorbed arrow.
    const absorbedArrow = (absorbed) / 2 + step;
    const absorbedROut = 50;
    const absorbedRIn = absorbedROut - absorbed;
    const absorbedY = 250;
    const absorbedX = 80;
    data += `l 0 ${absorbedY - absorbed / 2}
             a ${absorbedROut} ${absorbedROut} 0 0 0 ${-absorbedROut} ${-absorbedROut}
             L ${absorbedX} ${absorbedY - absorbed / 2}
             l 0 ${-step}
             l ${-absorbedArrow} ${absorbedArrow}
             l ${absorbedArrow} ${absorbedArrow}
             l 0 ${-step}
             L ${startX - emitted - absorbedRIn} ${absorbedY + absorbed / 2}
             a ${absorbedRIn} ${absorbedRIn} 0 0 1 ${absorbedRIn} ${absorbedRIn}
             l 0 ${windowY - absorbedY}
             Z`;
    return data;
}

export default LongwaveFromSurfaceArrows;
