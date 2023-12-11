import React, {useEffect, useState} from 'react';
import './App.css';
import Slider from './components/Slider';
import Label from './components/Label';
import ShortwaveArrows from './components/ShortwaveArrows';
import ConvectionArrow from "./components/ConvectionArrow";
import LongwaveToSpaceArrow from "./components/LongwaveToSpaceArrow";
import BackRadiationArrow from "./components/BackRadiationArrow";
import LongwaveFromSurfaceArrows from "./components/LongwaveFromSurfaceArrows";

function App() {
    const solarInput = 100;
    const defaultScatteredValue = 22;
    const defaultSwAbsorbedByAtmosphere = 20 * 100 / 78;
    const defaultReflectedValue = 9 * 100 / 58
    const defaultConvectionValue = 30;
    const defaultBackRadiation = 100 * 95 / 102;
    const defaultAtmosphericWindow = (12 * 100) / 114;

    // User input
    const [scatteredSlider, setScatteredSlider] = useState(defaultScatteredValue);
    const [reflectedSlider, setReflectedSlider] = useState(defaultReflectedValue);
    const [swAbsorbedByAtmosphereSlider, setSwAbsorbedByAtmosphereSlider] = useState(defaultSwAbsorbedByAtmosphere);
    const [convectionSlider, setConvectionSlider] = useState(defaultConvectionValue);
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
    const [lwEmittedFromSurface, setLwEmittedFromSurface] = useState(null);
    const [atmosphericWindow, setAtmosphericWindow] = useState(null);
    const [lwAbsorbedByAtmosphere, setLwAbsorbedByAtmosphere] = useState(null);
    const [backRadiation, setBackRadiation] = useState(null);
    useEffect(() => {
        const emitted = (absorbedBySurface - convectionSlider) / (1 - (1 - atmosphericWindowSlider / 100) * (backRadiationSlider / 100));
        const throughWindow = emitted * (atmosphericWindowSlider / 100);
        const absorbed = emitted * (1 - atmosphericWindowSlider / 100);
        const backRadiation = absorbed * backRadiationSlider / 100;
        setLwEmittedFromSurface(emitted);
        setAtmosphericWindow(throughWindow);
        setLwAbsorbedByAtmosphere(absorbed);
        setBackRadiation(backRadiation);
    }, [absorbedBySurface, convectionSlider, atmosphericWindowSlider, backRadiationSlider]);
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
        setConvectionSlider(defaultConvectionValue);
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
    }, []);

    return (
        <div className="App">
            <div id="space-background"></div>
            <div id="atmosphere-background"></div>
            <div id="earth-background"></div>
            <div id="main-content">
                <div id="centered">
                    {/*Shortwave*/}
                    <ShortwaveArrows x={0} y={0} scattered={scattered} reflected={reflected}
                                     atmosphere={swAbsorbedByAtmosphere}/>
                    <Label x={178} y={200 + scattered / 2} value={scattered}/>
                    <Slider x={162} y={190 + scattered} label={"Reflected by clouds"}
                            value={scatteredSlider} onChange={setScatteredSlider} hideValue={true}/>
                    <Label x={178} y={470 - reflected / 2} label={""} value={reflected}/>
                    <Slider x={162} y={460} label={"Reflected by surface"}
                            value={reflectedSlider} onChange={setReflectedSlider} hideValue={true}/>
                    <Label x={410} y={271} value={swAbsorbedByAtmosphere}/>
                    <Slider x={400} y={280} label={"Absorbed by atmosphere"} value={swAbsorbedByAtmosphereSlider} hideValue={true}
                            onChange={setSwAbsorbedByAtmosphereSlider}/>
                    <Label x={250 + (scattered + reflected + (100 - swAbsorbedByAtmosphere)) / 2}
                           y={450}
                           label={"Absorbed by surface"} value={absorbedBySurface}/>
                    <Label x={(110 - (scattered + reflected) / 2)} y={50} label={"Reflected to space"}
                           value={scattered + reflected}/>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={650} y={0} value={lwEmittedToSpace}/>
                    <Label x={650} y={50} label={"Emitted to space"} value={lwEmittedToSpace}/>
                    <BackRadiationArrow x={650} y={370} value={backRadiation}/>
                    <Label x={650} y={450} label={"Back radiation"} value={backRadiation}/>
                    <LongwaveFromSurfaceArrows x={650} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <Label x={900 - lwEmittedFromSurface / 2 + atmosphericWindow / 2} y={410}
                           label={"Radiated from surface"}
                           value={lwEmittedFromSurface}/>
                    <Label x={800} y={214} label={"Absorbed by greenhouse gases & clouds"}
                           value={lwAbsorbedByAtmosphere}/>
                    <Label x={900} y={50} label={"Through window"} value={atmosphericWindow}/>
                    <Slider x={630} y={300} label={"Back radiation"} value={backRadiationSlider}
                            onChange={setBackRadiationSlider} hideValue={true}/>
                    <Slider x={880} y={100} label={"Atmospheric window"} value={atmosphericWindowSlider}
                            onChange={setAtmosphericWindowSlider} hideValue={true}/>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convectionSlider}/>
                    <Slider x={500} y={340} label={"Convection & Latent Heat"} value={convectionSlider}
                            onChange={setConvectionSlider}/>
                    {/*Surface*/}
                    <Label x={500} y={530} label={"GMST"} value={gmst} valueSuffix={" °C"}/>
                    {/*Space*/}
                    <Label x={300} y={62} label={"Incoming solar radiation"} value={100}/>
                    {/*Other*/}
                    <div style={{position: 'absolute', left: 520, top: 280, width: 140}}>
                        Greenhouse gases & clouds
                    </div>
                    <button type="button" onClick={reset} style={{position: 'relative', top: 10}}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;
