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

    //
    const [atmosphericWindow, setAtmosphericWindow] = useState(12);
    const [lwAbsorbedByAtmosphere, setLwAbsorbedByAtmosphere] = useState(102);
    const [lwEmittedToSpace, setLwEmittedToSpace] = useState(57);
    const [lwEmittedFromSurface, setLwEmittedFromSurface] = useState(114);
    const [absorbedBySurface, setAbsorbedBySurface] = useState(0);
    useEffect(() => {
        const absorbedBySurface = 100 - (scatteredSlider + reflectedSlider) - swAbsorbedByAtmosphereSlider;
        setAbsorbedBySurface(absorbedBySurface);
    }, [scatteredSlider, reflectedSlider, swAbsorbedByAtmosphereSlider]);

    const handleScatteredSliderChange = (newValue) => {
        setScatteredSlider(newValue);
        constrain(reflectedSlider, setReflectedSlider, swAbsorbedByAtmosphereSlider, setSwAbsorbedByAtmosphereSlider, 100 - newValue);
        updateLwEmittedToSpace();
    };
    const handleReflectedSliderChange = (newValue) => {
        setReflectedSlider(newValue);
        constrain(scatteredSlider, setScatteredSlider, swAbsorbedByAtmosphereSlider, setSwAbsorbedByAtmosphereSlider, 100 - newValue);
        updateLwEmittedToSpace();
    };
    const handleSwAbsorbedByAtmosphereSliderChange = (newValue) => {
        setSwAbsorbedByAtmosphereSlider(newValue);
        constrain(scatteredSlider, setScatteredSlider, reflectedSlider, setReflectedSlider, 100 - newValue);
    };
    const handleConvectionSliderChange = (newValue) => {
        setConvectionSlider(newValue);
        //constrain(scatteredSlider, setScatteredValue, reflectedSlider, setReflectedValue, 100 - newValue);
    };
    const handleBackRadiationSliderChange = (newValue) => {
        setBackRadiationSlider(newValue);
        updateLwEmittedToSpace();
        //constrain(scatteredSlider, setScatteredValue, reflectedSlider, setReflectedValue, 100 - newValue);
    };
    const handleAtmosphericWindowPercentSliderChange = (newValue) => {
        setAtmosphericWindowPercentageSlider(newValue);
        const window = (newValue / 100) * 50;
        setAtmosphericWindow(window);
        updateLwAbsorbedByAtmosphere();
        updateLwEmittedToSpace();
    }

    function constrain(value1, setter1, value2, setter2, budget) {
        if (value1 + value2 > budget) {
            const newValue1 = Math.round(budget / 2);
            setter1(newValue1);
            setter2(budget - newValue1);
        }
    }

    function updateLwEmittedToSpace() {
        setLwEmittedToSpace(100 - reflectedSlider - scatteredSlider - atmosphericWindow);
    }

    function updateLwAbsorbedByAtmosphere() {
        setLwAbsorbedByAtmosphere(lwEmittedFromSurface - atmosphericWindow);
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
                    <button type="button" onClick={reset}>Reset</button>
                    {/*Shortwave*/}
                    <ShortwaveArrows x={0} y={0} scattered={scatteredSlider} reflected={reflectedSlider}
                                     atmosphere={swAbsorbedByAtmosphereSlider}/>
                    <Slider x={162} y={170 + scatteredSlider / 2} label={"Reflected by clouds"}
                            value={scatteredSlider} onChange={handleScatteredSliderChange}/>
                    <Slider x={162} y={439 - reflectedSlider / 2} label={"Reflected by surface"}
                            value={reflectedSlider} onChange={handleReflectedSliderChange}/>
                    <Slider x={400} y={240} label={"Absorbed by atmosphere"} value={swAbsorbedByAtmosphereSlider}
                            onChange={handleSwAbsorbedByAtmosphereSliderChange}/>
                    <Label x={250 + (scatteredSlider + reflectedSlider + (100 - swAbsorbedByAtmosphereSlider)) / 2} y={450}
                           label={"Absorbed by surface"} value={absorbedBySurface}/>
                    <Label x={(110 - (scatteredSlider + reflectedSlider) / 2)} y={50} label={"Reflected to space"}
                           value={scatteredSlider + reflectedSlider}/>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={700} y={0} value={lwEmittedToSpace}/>
                    <Label x={700} y={50} label={"Emitted to space"} value={lwEmittedToSpace}/>
                    <BackRadiationArrow x={700} y={370} value={backRadiationSlider}/>
                    <Label x={700} y={450} label={"Back radiation"} value={backRadiationSlider}/>
                    <LongwaveFromSurfaceArrows x={700} y={50} emitted={lwEmittedFromSurface}
                                               absorbed={lwAbsorbedByAtmosphere} window={atmosphericWindow}/>
                    <Label x={900 - lwEmittedFromSurface / 2 + atmosphericWindow / 2} y={410} label={"Radiated from surface"}
                           value={lwEmittedFromSurface}/>
                    <Label x={800} y={214} label={"Absorbed by greenhouse gases & clouds"}
                           value={lwAbsorbedByAtmosphere}/>
                    <Label x={900} y={50} label={"Through window"} value={atmosphericWindow}/>
                    <Slider x={680} y={280} label={"Back radiation"} value={backRadiationSlider}
                            onChange={handleBackRadiationSliderChange}/>
                    <Slider x={880} y={100} label={"Atmospheric window"} value={atmosphericWindowPercentageSlider}
                            onChange={handleAtmosphericWindowPercentSliderChange} hideLabel={true}/>
                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convectionSlider}/>
                    <Slider x={500} y={340} label={"Convection & Latent Heat"} value={convectionSlider}
                            onChange={handleConvectionSliderChange}/>
                    {/*Surface*/}
                    <Label x={500} y={530} label={"GMST"} value={0}/>
                    {/*Space*/}
                    <Label x={300} y={62} label={"Incoming solar radiation"} value={100}/>
                    {/*Other*/}
                    <div style={{position: 'absolute', left: 520, top: 280, width: 140}}>
                        Greenhouse gases & clouds
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
