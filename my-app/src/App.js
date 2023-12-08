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
    const defaultReflectedValue = 9;
    const defaultSwAbsorbedByAtmosphere = 20;
    const defaultConvectionValue = 30;
    const defaultBackRadiation = 96;
    const defaultAtmosphericWindow = 10;

    // User input
    const [scatteredSlider, setScatteredSlider] = useState(defaultScatteredValue);
    const [reflectedSlider, setReflectedSlider] = useState(defaultReflectedValue);
    const [swAbsorbedByAtmosphereSlider, setSwAbsorbedByAtmosphereSlider] = useState(defaultSwAbsorbedByAtmosphere);
    const [convectionSlider, setConvectionSlider] = useState(defaultConvectionValue);
    const [backRadiationSlider, setBackRadiationSlider] = useState(defaultBackRadiation);
    const [atmosphericWindowPercentageSlider, setAtmosphericWindowPercentageSlider] = useState(defaultAtmosphericWindow);

    // Computed values.
    const [lwEmittedFromSurface, setLwEmittedFromSurface] = useState(114);
    const [atmosphericWindow, setAtmosphericWindow] = useState(null);
    useEffect(() => {
        setAtmosphericWindow((atmosphericWindowPercentageSlider / 100) * lwEmittedFromSurface);
    }, [atmosphericWindowPercentageSlider, lwEmittedFromSurface]);
    const [lwEmittedToSpace, setLwEmittedToSpace] = useState(null);
    useEffect(() => {
        setLwEmittedToSpace(solarInput - reflectedSlider - scatteredSlider - atmosphericWindow);
    }, [reflectedSlider, scatteredSlider, atmosphericWindow]);
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
    const [lwAbsorbedByAtmosphere, setLwAbsorbedByAtmosphere] = useState(null);
    useEffect(() => {
        setLwAbsorbedByAtmosphere(lwEmittedFromSurface - atmosphericWindow);
    }, [lwEmittedFromSurface, atmosphericWindow]);
    const [gmst, setGmst] = useState(null);
    useEffect(() => {
        const boltzmannConstant = 5.6704E-8;
        const solarRadiationAbsolute = 342;
        setGmst(toCelsius(Math.pow((lwEmittedFromSurface / 100 * solarRadiationAbsolute) / boltzmannConstant, 0.25)));
    }, [lwEmittedFromSurface]);

    const handleScatteredSliderChange = (newValue) => {
        setScatteredSlider(newValue);
    };
    const handleReflectedSliderChange = (newValue) => {
        setReflectedSlider(newValue);
    };
    const handleSwAbsorbedByAtmosphereSliderChange = (newValue) => {
        setSwAbsorbedByAtmosphereSlider(newValue);
    };
    const handleConvectionSliderChange = (newValue) => {
        setConvectionSlider(newValue);
    };
    const handleBackRadiationSliderChange = (newValue) => {
        setBackRadiationSlider(newValue);
    };
    const handleAtmosphericWindowPercentSliderChange = (newValue) => {
        setAtmosphericWindowPercentageSlider(newValue);
    }

    function toCelsius(kelvin) {
        return kelvin - 273.15;
    }

    const reset = () => {
        setScatteredSlider(defaultScatteredValue);
        setReflectedSlider(defaultReflectedValue);
        setSwAbsorbedByAtmosphereSlider(defaultSwAbsorbedByAtmosphere);
        setConvectionSlider(defaultConvectionValue);
        setBackRadiationSlider(defaultBackRadiation);
        setAtmosphericWindowPercentageSlider(defaultAtmosphericWindow);
    }

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
                            value={scatteredSlider} onChange={handleScatteredSliderChange} hideValue={true}/>
                    <Label x={178} y={470 - reflected / 2} label={""} value={reflected}/>
                    <Slider x={162} y={460} label={"Reflected by surface"}
                            value={reflectedSlider} onChange={handleReflectedSliderChange} hideValue={true}/>
                    <Label x={410} y={271} value={swAbsorbedByAtmosphere}/>
                    <Slider x={400} y={280} label={"Absorbed by atmosphere"} value={swAbsorbedByAtmosphereSlider} hideValue={true}
                            onChange={handleSwAbsorbedByAtmosphereSliderChange}/>
                    <Label x={250 + (scattered + reflected + (100 - swAbsorbedByAtmosphere)) / 2}
                           y={450}
                           label={"Absorbed by surface"} value={absorbedBySurface}/>
                    <Label x={(110 - (scattered + reflected) / 2)} y={50} label={"Reflected to space"}
                           value={scattered + reflected}/>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={700} y={0} value={lwEmittedToSpace}/>
                    <Label x={700} y={50} label={"Emitted to space"} value={lwEmittedToSpace}/>
                    <BackRadiationArrow x={700} y={370} value={backRadiationSlider}/>
                    <Label x={700} y={450} label={"Back radiation"} value={backRadiationSlider}/>
                    <LongwaveFromSurfaceArrows x={700} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <Label x={900 - lwEmittedFromSurface / 2 + atmosphericWindow / 2} y={410}
                           label={"Radiated from surface"}
                           value={lwEmittedFromSurface}/>
                    <Label x={800} y={214} label={"Absorbed by greenhouse gases & clouds"}
                           value={lwAbsorbedByAtmosphere}/>
                    <Label x={900} y={50} label={"Through window"} value={atmosphericWindow}/>
                    <Slider x={680} y={280} label={"Back radiation"} value={backRadiationSlider}
                            onChange={handleBackRadiationSliderChange}/>
                    <Slider x={880} y={100} label={"Atmospheric window"} value={atmosphericWindowPercentageSlider}
                            onChange={handleAtmosphericWindowPercentSliderChange} hideValue={true}/>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convectionSlider}/>
                    <Slider x={500} y={340} label={"Convection & Latent Heat"} value={convectionSlider}
                            onChange={handleConvectionSliderChange}/>
                    {/*Surface*/}
                    <Label x={500} y={530} label={"GMST"} value={gmst}/>
                    {/*Space*/}
                    <Label x={300} y={62} label={"Incoming solar radiation"} value={100}/>
                    {/*Other*/}
                    <div style={{position: 'absolute', left: 520, top: 280, width: 140}}>
                        Greenhouse gases & clouds
                    </div>
                    <button type="button" onClick={reset} style={{position: 'relative'}}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;
