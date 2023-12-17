import React, {useEffect, useState} from 'react';
import './App.css';
import Slider from './components/Slider';
import ValueLabel from './components/ValueLabel';
import ShortwaveArrows from './components/ShortwaveArrows';
import ConvectionArrow from "./components/ConvectionArrow";
import LongwaveToSpaceArrow from "./components/LongwaveToSpaceArrow";
import BackRadiationArrow from "./components/BackRadiationArrow";
import LongwaveFromSurfaceArrows from "./components/LongwaveFromSurfaceArrows";
import {Tooltip} from "react-tooltip";

function App() {
    const solarInput = 100;
    const defaultScatteredValue = 22;
    const defaultSwAbsorbedByAtmosphere = 20 * 100 / 78;
    const defaultReflectedValue = 9 * 100 / 58
    const defaultConvectionSlider = 100 * 30 / 49;
    const defaultBackRadiation = 100 * 95 / (95 + 57);
    const defaultAtmosphericWindow = (12 * 100) / 114;

    // User input
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
            <div id="space-background"></div>
            <div id="atmosphere-background"></div>
            <div id="earth-background"></div>
            <div id="main-content">
                <div id="centered">
                    <div className={"layer-label-container"}>
                        <label className={"layer-text"} style={{left: 495, color: "white"}}>Space</label>
                        <label className={"layer-text"} style={{left: 220}}>Atmosphere</label>
                        <label className={"layer-text"} style={{left: 0}}>Earth</label>
                    </div>
                    {/*Shortwave*/}
                    <ShortwaveArrows x={0} y={0} scattered={scattered} reflected={reflected}
                                     atmosphere={swAbsorbedByAtmosphere}/>
                    <div className={"control-container incoming-solar-tooltip"}
                         style={{left: 250, top: 62, width: 100}}>
                        <ValueLabel label={"Incoming solar radiation"} value={100}/>
                    </div>
                    <div className={"control-container scattered-tooltip"}
                         style={{left: 115, top: 220 + scattered / 2}}>
                        <ValueLabel value={scattered}/>
                        <Slider label={"Reflected by clouds"}
                                value={scatteredSlider} onChange={setScatteredSlider} hideValue={true}/>
                    </div>
                    <div className={"control-container reflected-tooltip"}
                         style={{left: 115, top: 490 - reflected / 2}}>
                        <ValueLabel value={reflected}/>
                        <Slider label={"Reflected by surface"}
                                value={reflectedSlider} onChange={setReflectedSlider} hideValue={true}/>
                    </div>
                    <div className={"control-container albedo-tooltip"}
                         style={{left: 45 - (scattered + reflected) / 2, top: 20}}>
                        <div className={"space-label-container"}>
                            <div className={"space-label"} style={{bottom: 10 + (scattered + reflected) / 2}}>{"Reflected to space"}</div>
                        </div>
                        <ValueLabel value={scattered + reflected}/>
                    </div>
                    <div className={"control-container sw-absorbed-atmosphere-tooltip"} style={{left: 350, top: 290}}>
                        <ValueLabel value={swAbsorbedByAtmosphere}/>
                        <Slider label={"Absorbed by atmosphere"} value={swAbsorbedByAtmosphereSlider}
                                hideValue={true} onChange={setSwAbsorbedByAtmosphereSlider}/>
                    </div>
                    <div className={"control-container sw-absorbed-surface-tooltip"}
                         style={{left: 185 + (scattered + reflected + (100 - swAbsorbedByAtmosphere)) / 2, top: 450}}>
                        <ValueLabel label={"Absorbed by surface"} value={absorbedBySurface}/>
                    </div>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={580} y={0} value={lwEmittedToSpace}/>
                    <div className={"control-container lw-space-tooltip"} style={{left: 515, top: 20}}>
                        <div className={"space-label-container"}>
                            <div className={"space-label"}
                                 style={{bottom: 10 + lwEmittedToSpace / 2}}>{"Emitted to space"}</div>
                        </div>
                        <ValueLabel value={lwEmittedToSpace}/>
                    </div>
                    <BackRadiationArrow x={650} y={370} value={backRadiation}/>
                    <LongwaveFromSurfaceArrows x={650} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <div className={"control-container lw-surface-tooltip"}
                         style={{left: 835 - lwEmittedFromSurface / 2 + atmosphericWindow / 2, top: 430}}>
                        <ValueLabel value={lwEmittedFromSurface}/>
                        <label>{"Radiated from surface"}</label>
                    </div>
                    <div className={"control-container lw-absorbed-tooltip"} style={{left: 750, top: 280, width: 150}}>
                        <div style={{marginTop: 10, float: "left"}}>
                            <ValueLabel value={lwAbsorbedByAtmosphere}/>
                        </div>
                        <label>{"Absorbed by atmosphere"}</label>
                    </div>
                    <div className={"control-container window-tooltip"} style={{left: 835, top: 20}}>
                        <div className={"space-label-container"}>
                            <div className={"space-label"}
                                 style={{bottom: 10 + atmosphericWindow / 2}}>{"Through window"}</div>
                        </div>
                        <ValueLabel value={atmosphericWindow}/>
                        <Slider label={"Atmospheric window"} value={atmosphericWindowSlider}
                                onChange={setAtmosphericWindowSlider} hideValue={true}/>
                    </div>
                    <div className={"control-container back-radiation-tooltip"} style={{left: 585, top: 450}}>
                        <Slider label={"Back radiation"} value={backRadiationSlider}
                                onChange={setBackRadiationSlider} hideValue={true}/>
                        <ValueLabel value={backRadiation}/>
                    </div>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convection}/>
                    <div className={"control-container convection-tooltip"} style={{left: 455, top: 392}}>
                        <ValueLabel value={convection}/>
                        <Slider label={"Convection & Latent Heat"} value={convectionSlider} hideValue={true}
                                onChange={setConvectionSlider}/>
                    </div>
                    {/*Surface*/}
                    <div className={"control-container gmst-tooltip"} style={{left: 420, top: 530, width: 100}}>
                        <ValueLabel label={"GMST"} value={gmst} valueSuffix={" °C"}/>
                    </div>
                    {/*Other*/}
                    <div style={{position: 'absolute', left: 460, top: 230, width: 220}}>
                        <img src={"graphics/cloud-1.png"} alt={"cloud"} className={"cloud-image"}/>
                        <div style={{position: "absolute", top: 48, width: '100%', fontWeight: "bold"}}>
                            Greenhouse gases<br/>& clouds
                        </div>
                    </div>
                    <img src={"graphics/cloud-2.png"} alt={"cloud"} className={"cloud-image"}
                         style={{zIndex: 0, left: 110, top: 250, width: 140}}/>
                    {/*Second cloud has greater z-index with opacity 0.5.*/}
                    <img src={"graphics/cloud-2.png"} alt={"cloud"} className={"cloud-image"}
                         style={{zIndex: 1, left: 110, top: 250, width: 140, opacity: 0.5}}/>
                    <button type="button" id={"reset-button"} onClick={reset}>Reset
                    </button>
                    <div className={"footer"}>
                        <ul className={"footer-content"}>
                            <li>&copy; Craig Walton 2023</li>
                            <li><a href={"https://github.com/craigwalton/ClimateApp"}>Source on GitHub</a></li>
                            <li><span className={"ack ack-tooltip"}>Acknowledgments</span></li>
                        </ul>
                    </div>
                </div>
                <Tooltip anchorSelect=".incoming-solar-tooltip" place="bottom" className="custom-tooltip">
                    The amount of solar radiation from the Sun which is intercepted by the Earth.<br/>
                    This is <b className="shortwave-text">shortwave</b> radiation.
                    It is approximately 342 Wm<sup>-2</sup>.
                </Tooltip>
                <Tooltip anchorSelect=".scattered-tooltip" place="top" className="custom-tooltip">
                    The amount of <b className="shortwave-text">shortwave</b> solar radiation which is scattered by
                    clouds back into space.<br/>
                    This, along with the radiation reflected by earth's surface, makes up the Earth's
                    albedo.
                </Tooltip>
                <Tooltip anchorSelect=".sw-absorbed-atmosphere-tooltip" place="top" className="custom-tooltip">
                    The amount of solar radiation (<b className="shortwave-text">shortwave</b>) which is absorbed by
                    water vapour (clouds) and aerosols.
                </Tooltip>
                <Tooltip anchorSelect=".reflected-tooltip" place="bottom" className="custom-tooltip">
                    The amount of <b className="shortwave-text">shortwave</b> solar radiation which is reflected by the
                    earth's surface back into space.
                    <br/>This, along with the radiation scattered by clouds, makes up the Earth's albedo.
                </Tooltip>
                <Tooltip anchorSelect=".albedo-tooltip" place="top" className="custom-tooltip">
                    The combination of <b className="shortwave-text">shortwave</b> solar radiation which is returned to
                    space due to the Earth's albedo: reflected by clouds and surface.
                </Tooltip>
                <Tooltip anchorSelect=".sw-absorbed-surface-tooltip" place="top" className="custom-tooltip">
                    The amount of solar radiation (<b className="shortwave-text">shortwave</b>) which is absorbed by
                    Earth's surface.
                </Tooltip>
                <Tooltip anchorSelect=".gmst-tooltip" place="top" className="custom-tooltip">
                    The Global Mean Surface Temperature
                </Tooltip>
                <Tooltip anchorSelect=".convection-tooltip" place="top" className="custom-tooltip">
                    A combination of conduction and convection transfers heat from Earth's surface to the
                    atmosphere.<br/>
                    The evaporation of water extracts heat from Earth's surface and when it condenses in the atmosphere,
                    releases the heat.
                </Tooltip>
                <Tooltip anchorSelect=".lw-surface-tooltip" place="top" className="custom-tooltip">
                    <b className="longwave-text">Longwave</b> radiation emitted by Earth's surface as a function of its
                    temperature.
                </Tooltip>
                <Tooltip anchorSelect=".lw-absorbed-tooltip" place="top" className="custom-tooltip">
                    <b className="longwave-text">Longwave</b> radiation absorbed by greenhouse gases and clouds.
                </Tooltip>
                <Tooltip anchorSelect=".window-tooltip" place="top" className="custom-tooltip">
                    Some of the <b className="longwave-text">longwave</b> radiation from Earth's surface (between 8 and
                    13 μm wavelength) is not absorbed by greenhouse gases so escapes directly to space.
                </Tooltip>
                <Tooltip anchorSelect=".lw-space-tooltip" place="top" className="custom-tooltip">
                    Some of the heat absorbed by the atmosphere (from <b className="shortwave-text">shortwave</b>, <b
                    className="longwave-text">longwave</b> and <b className="convection-text">convection &amp; latent
                    heat</b>) is emitted as <b className="longwave-text">longwave</b> radiation into space.
                </Tooltip>
                <Tooltip anchorSelect=".back-radiation-tooltip" place="top" className="custom-tooltip">
                    The <b className="longwave-text">longwave</b> radiation emitted by the atmosphere (from <b
                    className="shortwave-text">shortwave</b>, <b
                    className="longwave-text">longwave</b> and <b className="convection-text">convection &amp; latent
                    heat</b>) <i>back</i> to Earth's surface. This is the greenhouse effect, which keeps the GMST over
                    30 °C warmer than it otherwise would be.
                </Tooltip>
                <Tooltip anchorSelect=".ack-tooltip" place="top" className="custom-tooltip" clickable>
                    Diagram inspiration: <a href={"https://www.open.edu/openlearn/nature-environment/climate-change/"}>OpenLearn Climate Change</a><br/>
                    Cloud images: <a href={"https://www.freepik.com/free-vector/collection-3d-white-clouds-isolated-white_20111680.htm"} target={"_blank"}>
                        Image by bs_k1d on Freepik
                    </a>
                </Tooltip>
            </div>
        </div>
    );
}

export default App;
