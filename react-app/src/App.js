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
                    <div className={"control-container incoming-solar-radiation-tooltip"} style={{left: 250, top: 62, width: 100}}>
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
                    <div className={"control-container"} style={{left: 350, top: 290}}>
                        <ValueLabel value={swAbsorbedByAtmosphere}/>
                        <Slider label={"Absorbed by atmosphere"} value={swAbsorbedByAtmosphereSlider}
                                hideValue={true} onChange={setSwAbsorbedByAtmosphereSlider}/>
                    </div>
                    <div className={"control-container"}
                         style={{left: 185 + (scattered + reflected + (100 - swAbsorbedByAtmosphere)) / 2, top: 450}}>
                        <ValueLabel label={"Absorbed by surface"} value={absorbedBySurface}/>
                    </div>
                    <div className={"control-container albedo-tooltip"}
                         style={{left: 45 - (scattered + reflected) / 2, top: 20}}>
                        <label className={"white-label"}>{"Reflected to space"}</label>
                        <ValueLabel value={scattered + reflected}/>
                    </div>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={580} y={0} value={lwEmittedToSpace}/>
                    <div className={"control-container"} style={{left: 515, top: 20}}>
                        <label className={"white-label"}>{"Emitted to space"}</label>
                        <ValueLabel value={lwEmittedToSpace}/>
                    </div>
                    <BackRadiationArrow x={650} y={370} value={backRadiation}/>
                    <LongwaveFromSurfaceArrows x={650} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <div className={"control-container"}
                         style={{left: 835 - lwEmittedFromSurface / 2 + atmosphericWindow / 2, top: 430}}>
                        <ValueLabel value={lwEmittedFromSurface}/>
                        <label>{"Radiated from surface"}</label>
                    </div>
                    <div className={"control-container"} style={{left: 750, top: 270, width: 150}}>
                        <div style={{marginTop: 20, float: "left"}}>
                            <ValueLabel value={lwAbsorbedByAtmosphere}/>
                        </div>
                        <label>{"Absorbed by greenhouse gases & clouds"}</label>
                    </div>
                    <div className={"control-container"} style={{left: 835, top: 20}}>
                        <label className={"white-label"}>{"Through window"}</label>
                        <ValueLabel value={atmosphericWindow}/>
                        <Slider label={"Atmospheric window"} value={atmosphericWindowSlider}
                                onChange={setAtmosphericWindowSlider} hideValue={true}/>
                    </div>
                    <div className={"control-container"} style={{left: 585, top: 440}}>
                        <Slider label={"Back radiation"} value={backRadiationSlider}
                                onChange={setBackRadiationSlider} hideValue={true}/>
                        <ValueLabel value={backRadiation}/>
                    </div>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convection}/>
                    <div className={"control-container"} style={{left: 455, top: 392}}>
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
                        {/*https://www.freepik.com/free-vector/collection-3d-white-clouds-isolated-white_20111680.htm#query=3d%20cloud&position=0&from_view=keyword&track=ais&uuid=492040cd-bdb2-485d-b6ae-ed471f741f63">Image by bs_k1d*/}
                        <img src={"/graphics/cloud-1.png"} alt={"cloud Image by bs_k1d"} className={"cloud-image"}/>
                        <div style={{position: "absolute", top: 48, width: '100%', fontWeight: "bold"}}>
                            Greenhouse gases<br/>& clouds
                        </div>
                    </div>
                    <img src={"/graphics/cloud-2.png"} alt={"cloud Image by bs_k1d"} className={"cloud-image"}
                         style={{zIndex: 0, left: 110, top: 250, width: 140}}/>
                    {/*Second cloud has greater z-index with opacity 0.5.*/}
                    <img src={"/graphics/cloud-2.png"} alt={"cloud Image by bs_k1d"} className={"cloud-image"}
                         style={{zIndex: 1, left: 110, top: 250, width: 140, opacity: 0.5}}/>
                    <button type="button" onClick={reset} style={{position: 'relative', top: 10, left: -40}}>Reset
                    </button>
                </div>
                <Tooltip anchorSelect=".incoming-solar-radiation-tooltip" place="top" className="custom-tooltip">
                    The amount of solar <b className="shortwave-text">shortwave</b> radiation from the Sun which is intercepted by the Earth.<br/>
                    It is approximately 342 Wm<sup>-2</sup>.
                </Tooltip>
                <Tooltip anchorSelect=".scattered-tooltip" place="top" className="custom-tooltip">
                    The amount of <b className="shortwave-text">shortwave</b> solar radiation which is scattered by
                    clouds back into space.<br/>
                    This, along with the radiation reflected by earth's surface, makes up the Earth's
                    albedo.
                </Tooltip>
                <Tooltip anchorSelect=".reflected-tooltip" place="top" className="custom-tooltip">
                    The amount of <b className="shortwave-text">shortwave</b> solar radiation which is reflected by the
                    earth's surface back into space.
                    <br/>This, along with the radiation scattered by clouds, makes up the Earth's albedo.
                </Tooltip>
                <Tooltip anchorSelect=".albedo-tooltip" place="top" className="custom-tooltip">
                    The combination of <b className="shortwave-text">shortwave</b> solar radiation which is returned to
                    space due to the Earth's albedo: reflected by clouds and surface.
                </Tooltip>
                <Tooltip anchorSelect=".gmst-tooltip" place="top" className="custom-tooltip">
                    The Global Mean Surface Temperature
                </Tooltip>
            </div>
        </div>
    );
}

export default App;
