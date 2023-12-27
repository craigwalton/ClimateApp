import React, {useEffect, useState} from 'react';
import './App.css';
import Slider from './components/Slider';
import ValueLabel from './components/ValueLabel';
import ShortwaveArrows from './components/Arrows/ShortwaveArrows';
import ConvectionArrow from "./components/Arrows/ConvectionArrow";
import LongwaveToSpaceArrow from "./components/Arrows/LongwaveToSpaceArrow";
import BackRadiationArrow from "./components/Arrows/BackRadiationArrow";
import LongwaveFromSurfaceArrows from "./components/Arrows/LongwaveFromSurfaceArrows";
import Tooltips from "./components/Tooltips";

function App() {
    // Constants.
    const solarInput = 100;
    const defaultScatteredValue = 22;
    const defaultSwAbsorbedByAtmosphere = 20 * 100 / 78;
    const defaultReflectedValue = 9 * 100 / 58
    const defaultConvectionSlider = 100 * 30 / 49;
    const defaultBackRadiation = 100 * 95 / (95 + 57);
    const defaultAtmosphericWindow = (12 * 100) / 114;
    const graphicsPath = process.env.PUBLIC_URL + "/graphics/";

    // Sliders.
    const [scatteredSlider, setScatteredSlider] = useState(defaultScatteredValue);
    const [reflectedSlider, setReflectedSlider] = useState(defaultReflectedValue);
    const [swAbsorbedByAtmosphereSlider, setSwAbsorbedByAtmosphereSlider] = useState(defaultSwAbsorbedByAtmosphere);
    const [convectionSlider, setConvectionSlider] = useState(defaultConvectionSlider);
    const [backRadiationSlider, setBackRadiationSlider] = useState(defaultBackRadiation);
    const [atmosphericWindowSlider, setAtmosphericWindowSlider] = useState(defaultAtmosphericWindow);

    // Computed values.
    const [scattered, setScattered] = useState(null);
    useEffect(() => {
        setScattered((scatteredSlider / 100) * solarInput);
    }, [scatteredSlider]);
    const [swAbsorbedByAtmosphere, setSwAbsorbedByAtmosphere] = useState(null);
    useEffect(() => {
        setSwAbsorbedByAtmosphere((swAbsorbedByAtmosphereSlider / 100) * (solarInput - scattered));
    }, [swAbsorbedByAtmosphereSlider, scattered]);
    const [reflected, setReflected] = useState(null);
    useEffect(() => {
        setReflected((reflectedSlider / 100) * (solarInput - scattered - swAbsorbedByAtmosphere));
    }, [reflectedSlider, scattered, swAbsorbedByAtmosphere]);
    const [absorbedBySurface, setAbsorbedBySurface] = useState(null);
    useEffect(() => {
        setAbsorbedBySurface(solarInput - (scattered + swAbsorbedByAtmosphere + reflected));
    }, [scattered, swAbsorbedByAtmosphere, reflected]);
    const [convection, setConvection] = useState(null);
    useEffect(() => {
        setConvection((convectionSlider / 100) * absorbedBySurface);
    }, [convectionSlider, absorbedBySurface]);
    const [lwEmittedFromSurface, setLwEmittedFromSurface] = useState(null);
    const [atmosphericWindow, setAtmosphericWindow] = useState(null);
    const [lwAbsorbedByAtmosphere, setLwAbsorbedByAtmosphere] = useState(null);
    const [backRadiation, setBackRadiation] = useState(null);
    useEffect(() => {
        function computeLongwaveRadiationEmittedFromSurface(backRadiationProportion, windowProportion) {
            const numerator = absorbedBySurface - convection + backRadiationProportion *
                (swAbsorbedByAtmosphere + convection);
            const denominator = 1 - backRadiationProportion * (1 - windowProportion);
            return numerator / denominator;
        }

        const backRadiationProportion = backRadiationSlider / 100;
        const windowProportion = atmosphericWindowSlider / 100;
        const lwEmitted = computeLongwaveRadiationEmittedFromSurface(backRadiationProportion, windowProportion);
        const lwAbsorbed = lwEmitted * (1 - windowProportion);
        setLwEmittedFromSurface(lwEmitted);
        setAtmosphericWindow(lwEmitted * windowProportion);
        setLwAbsorbedByAtmosphere(lwAbsorbed);
        const ghgAndCloudInput = (lwAbsorbed + swAbsorbedByAtmosphere + convection);
        setBackRadiation(ghgAndCloudInput * backRadiationProportion);
        setLwEmittedToSpace(ghgAndCloudInput * (1 - backRadiationProportion));
    }, [swAbsorbedByAtmosphere, absorbedBySurface, convection, atmosphericWindowSlider, backRadiationSlider]);
    const [lwEmittedToSpace, setLwEmittedToSpace] = useState(null);
    useEffect(() => {
        setLwEmittedToSpace(solarInput - reflected - scattered - atmosphericWindow);
    }, [reflected, scattered, atmosphericWindow]);
    const [gmst, setGmst] = useState(null);
    useEffect(() => {
        const boltzmannConstant = 5.6704E-8;
        const solarRadiationAbsolute = 342;
        setGmst(toCelsius(Math.pow((lwEmittedFromSurface / 100 * solarRadiationAbsolute) / boltzmannConstant, 0.25)));
    }, [lwEmittedFromSurface]);

    function toCelsius(kelvin) {
        return kelvin - 273.15;
    }

    const reset = () => {
        setScatteredSlider(defaultScatteredValue);
        setReflectedSlider(defaultReflectedValue);
        setSwAbsorbedByAtmosphereSlider(defaultSwAbsorbedByAtmosphere);
        setConvectionSlider(defaultConvectionSlider);
        setBackRadiationSlider(defaultBackRadiation);
        setAtmosphericWindowSlider(defaultAtmosphericWindow);
    };

    const noGreenhouseEffect = () => {
        setScatteredSlider(defaultScatteredValue);
        setReflectedSlider(12);
        setSwAbsorbedByAtmosphereSlider(0);
        setBackRadiationSlider(0);
        setAtmosphericWindowSlider(100);
        setConvectionSlider(0);
    };

    const moreCloudAlbedo = () => {
        setScatteredSlider(26.4);
        setReflectedSlider(defaultReflectedValue);
        setSwAbsorbedByAtmosphereSlider(defaultSwAbsorbedByAtmosphere);
        setConvectionSlider(defaultConvectionSlider);
        setBackRadiationSlider(defaultBackRadiation);
        setAtmosphericWindowSlider(defaultAtmosphericWindow);
    }

    useEffect(() => {
        const listener = event => {
            if (event.code === "KeyR") {
                reset();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    return (
        <div className="App">
            <header>
                <div className="centered" style={{paddingTop: 10}}>
                    <div style={{fontSize: 30, fontWeight: "bold"}}>
                        Climate Explorer: what governs Earth's temperature?
                    </div>
                    <p>
                        Adjust the sliders to visualise the effect that each system has on Earth's Global Mean Surface
                        Temperature (GMST), and the interplay between them.
                        The numbers shown are percentages relative to the incoming solar radiation
                        (342 Wm<sup>-2</sup>).
                    </p>
                    <p>
                        Tap or hover over the &#9432; icons to learn more about each system.
                    </p>
                    <details style={{textAlign: "left"}}>
                        <summary>What if...</summary>
                        <ul>
                            <li><button className="link-button" onClick={noGreenhouseEffect}>
                                ...there was no greenhouse effect?
                            </button></li>
                            <li><button className="link-button" onClick={moreCloudAlbedo}>
                                ...clouds reflected 20% more solar radiation without absorbing more shortwave radiation?
                            </button></li>
                        </ul>
                    </details>
                    <br/>
                    <button type="button" id="reset-button" onClick={reset} title="Reset sliders (R)">Reset</button>
                </div>
            </header>
            <main>
                <div className="centered" style={{zIndex: 1}}>
                    <div className="layer-label-container">
                        <label className="layer-text" style={{left: 505, color: "white"}}>Space</label>
                        <label className="layer-text" style={{left: 225}}>Atmosphere</label>
                        <label className="layer-text" style={{left: 5}}>Earth</label>
                    </div>
                    {/*Shortwave*/}
                    <ShortwaveArrows x={0} y={0} scattered={scattered} reflected={reflected}
                                     atmosphere={swAbsorbedByAtmosphere}/>
                    <div className="control-container"
                         style={{left: 250, top: 40, width: 100}}>
                        <div className="incoming-solar-tooltip">&#9432;</div>
                        <ValueLabel label="Incoming solar radiation" value={100}/>
                    </div>
                    <div className="control-container" style={{left: 115, top: 220 + scattered / 2}}>
                        <ValueLabel value={scattered}/>
                        <Slider label="Reflected by clouds"
                                value={scatteredSlider} onChange={setScatteredSlider}/>
                        <div className="scattered-tooltip">&#9432;</div>
                    </div>
                    <div className="control-container" style={{left: 115, top: 490 - reflected / 2}}>
                        <ValueLabel value={reflected}/>
                        <div style={{height: 30, paddingTop: 5}}>
                            <Slider value={reflectedSlider} onChange={setReflectedSlider}/>
                        </div>
                        <div>Reflected by surface</div>
                        <div className="reflected-tooltip">&#9432;</div>
                    </div>
                    <div className="control-container"
                         style={{left: 45 - (scattered + reflected) / 2, top: 20}}>
                        <div className="space-label-container">
                            <div className="space-label"
                                 style={{bottom: Math.min(10 + (scattered + reflected) / 2, 35)}}>
                                <div className="albedo-tooltip">&#9432;</div>
                                Reflected to space
                            </div>
                        </div>
                        <ValueLabel value={scattered + reflected}/>
                    </div>
                    <div className="control-container" style={{left: 350, top: 290}}>
                        <ValueLabel value={swAbsorbedByAtmosphere}/>
                        <Slider label="Absorbed by atmosphere" value={swAbsorbedByAtmosphereSlider}
                                onChange={setSwAbsorbedByAtmosphereSlider}/>
                        <div className="sw-absorbed-atmosphere-tooltip">&#9432;</div>
                    </div>
                    <div className="control-container"
                         style={{
                             left: 185 + (scattered + reflected + (100 - swAbsorbedByAtmosphere)) / 2,
                             top: 490,
                             height: 70
                         }}>
                        <div style={{height: 50}}>
                            <ValueLabel value={absorbedBySurface}/>
                        </div>
                        <div>Absorbed by surface</div>
                        <div className="sw-absorbed-surface-tooltip">&#9432;</div>
                    </div>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={580} y={100} value={lwEmittedToSpace}/>
                    <div className="control-container" style={{left: 515, top: 20}}>
                        <div className="space-label-container">
                            <div className="space-label" style={{bottom: Math.min(10 + lwEmittedToSpace / 2, 50)}}>
                                <div className="lw-space-tooltip">&#9432;</div>
                                Emitted to space
                            </div>
                        </div>
                        <ValueLabel value={lwEmittedToSpace}/>
                    </div>
                    <BackRadiationArrow x={650} y={500} value={backRadiation}/>
                    <LongwaveFromSurfaceArrows x={650} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <div className="control-container"
                         style={{left: 835 - lwEmittedFromSurface / 2 + atmosphericWindow / 2, top: 420}}>
                        <ValueLabel value={lwEmittedFromSurface}/>
                        <label>Radiated from surface</label><br/>
                        <div className="lw-surface-tooltip">&#9432;</div>
                    </div>
                    <div className="control-container" style={{left: 750, top: 280, width: 155}}>
                        <div style={{marginTop: 10, float: "left"}}>
                            <ValueLabel value={lwAbsorbedByAtmosphere}/>
                        </div>
                        <div style={{width: 140, position: "absolute", right: 0}}>
                            <label>Absorbed by atmosphere</label><br/>
                            <div className="lw-absorbed-tooltip">&#9432;</div>
                        </div>
                    </div>
                    <div className="control-container" style={{left: 835, top: 20}}>
                        <div className="space-label-container">
                            <div className="space-label" style={{bottom: 10 + atmosphericWindow / 2}}>
                                <div className="window-tooltip">&#9432;</div>
                                Through window
                            </div>
                        </div>
                        <ValueLabel value={atmosphericWindow}/>
                        <Slider label="Atmospheric window" value={atmosphericWindowSlider}
                                onChange={setAtmosphericWindowSlider}/>
                    </div>
                    <div className="control-container" style={{left: 585, top: 410}}>
                        <div className="back-radiation-tooltip">&#9432;</div>
                        <div style={{height: 40}}>Back<br/>radiation</div>
                        <Slider value={backRadiationSlider} max={70} onChange={setBackRadiationSlider}/>
                        <ValueLabel value={backRadiation}/>
                    </div>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={460} y={500} value={convection}/>
                    <div className="control-container" style={{left: 455, top: 392}}>
                        <ValueLabel value={convection}/>
                        <Slider label="Convection & Latent Heat" value={convectionSlider}
                                onChange={setConvectionSlider}/>
                        <div className="convection-tooltip">&#9432;</div>
                    </div>
                    {/*Surface*/}
                    <div className="control-container" style={{left: 450, top: 540, width: 100}}>
                        <ValueLabel label="GMST" value={gmst} valueSuffix=" °C"/>
                        <div className="gmst-tooltip">&#9432;</div>
                    </div>
                    {/*Other*/}
                    <div style={{position: 'absolute', left: 460, top: 230, width: 220}}>
                        <img src={graphicsPath + "cloud-1.png"} alt="cloud" className="cloud-image"/>
                        <div style={{position: "absolute", top: 48, width: '100%', fontWeight: "bold"}}>
                            Greenhouse gases<br/>&amp; clouds
                        </div>
                    </div>
                    <img src={graphicsPath + "cloud-2.png"} alt="cloud" className="cloud-image"
                         style={{zIndex: 0, left: 110, top: 250, width: 140}}/>
                    {/*Second cloud has greater z-index with opacity 0.5.*/}
                    <img src={graphicsPath + "cloud-2.png"} alt="cloud" className="cloud-image"
                         style={{zIndex: 1, left: 110, top: 250, width: 140, opacity: 0.5}}/>
                </div>
                <div style={{position: "absolute", top: 0, width:"100%"}}>
                    <div id="space-background"></div>
                    <div id="atmosphere-background"></div>
                    <div id="earth-background"></div>
                </div>
            </main>
            <footer>
                <ul className="footer-content">
                    <li>&copy; Craig Walton 2023</li>
                    <li><a href="https://github.com/craigwalton/ClimateExplorer">Source on GitHub</a></li>
                    <li><span className="ack ack-tooltip">Acknowledgments</span></li>
                </ul>
            </footer>
            <Tooltips />
        </div>
    );
}

export default App;
