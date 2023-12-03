import React, {useState} from 'react';
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
    const defaultAtmosphereValue = 20;
    const defaultConvectionValue = 30;
    const [scatteredValue, setScatteredValue] = useState(defaultScatteredValue);
    const [reflectedValue, setReflectedValue] = useState(defaultReflectedValue);
    const [atmosphereValue, setAtmosphereValue] = useState(defaultAtmosphereValue);
    const [convectionValue, setConvectionValue] = useState(defaultConvectionValue);

    const handleScatteredSliderChange = (newValue) => {
        setScatteredValue(newValue);
        constrain(reflectedValue, setReflectedValue, atmosphereValue, setAtmosphereValue, 100 - newValue);
    };
    const handleReflectedSliderChange = (newValue) => {
        setReflectedValue(newValue);
        constrain(scatteredValue, setScatteredValue, atmosphereValue, setAtmosphereValue, 100 - newValue);
    };
    const handleAtmosphereSliderChange = (newValue) => {
        setAtmosphereValue(newValue);
        constrain(scatteredValue, setScatteredValue, reflectedValue, setReflectedValue, 100 - newValue);
    };
    const handleConvectionSliderChange = (newValue) => {
        setConvectionValue(newValue);
        //constrain(scatteredValue, setScatteredValue, reflectedValue, setReflectedValue, 100 - newValue);
    };

    function constrain(value1, setter1, value2, setter2, budget) {
        if (value1 + value2 > budget) {
            const newValue1 = Math.round(budget / 2);
            setter1(newValue1);
            setter2(budget - newValue1);
        }
    }

    const reset = () => {
        setScatteredValue(defaultScatteredValue);
        setReflectedValue(defaultReflectedValue);
        setAtmosphereValue(defaultAtmosphereValue);
        setConvectionValue(defaultConvectionValue);
    }

    const totalReflected = scatteredValue + reflectedValue;
    const absorbedBySurface = 100 - totalReflected - atmosphereValue;
    const emittedToSpace = 57;
    const backRadiation = 40;
    const emittedFromSurface = 50;
    const longwaveAbsorbedByAtmosphere = 40;
    const throughWindow = emittedFromSurface - longwaveAbsorbedByAtmosphere
    return (
        <div className="App">
            <div id="space-background"></div>
            <div id="atmosphere-background"></div>
            <div id="earth-background"></div>
            <div id="main-content">
                <div id="centered">
                    <button type="button" onClick={reset}>Reset</button>
                    {/*Shortwave*/}
                    <ShortwaveArrows x={0} y={0} scattered={scatteredValue} reflected={reflectedValue}
                                     atmosphere={atmosphereValue}/>
                    <Slider x={162} y={140 + scatteredValue / 2} label={"Reflected by clouds"}
                            value={scatteredValue} onChange={handleScatteredSliderChange}/>
                    <Slider x={162} y={409 - reflectedValue / 2} label={"Reflected by surface"}
                            value={reflectedValue} onChange={handleReflectedSliderChange}/>
                    <Slider x={400} y={210} label={"Absorbed by atmosphere"} value={atmosphereValue}
                            onChange={handleAtmosphereSliderChange}/>
                    <Label x={250 + (totalReflected + (100 - atmosphereValue)) / 2} y={450}
                           label={"Absorbed by surface"} value={absorbedBySurface}/>
                    <Label x={(110 - totalReflected / 2)} y={65} label={"Reflected to space"}
                           value={totalReflected}/>
                    {/*Longwave*/}
                    <LongwaveToSpaceArrow x={700} y={0} value={emittedToSpace}/>
                    <Label x={700} y={50} label={"Emitted to space"} value={emittedToSpace}/>
                    <BackRadiationArrow x={700} y={350} value={backRadiation}/>
                    <Label x={700} y={430} label={"Back radiation"} value={backRadiation}/>
                    <LongwaveFromSurfaceArrows x={700} y={50} emitted={emittedFromSurface}
                                               absorbed={longwaveAbsorbedByAtmosphere} window={throughWindow} />
                    <Label x={870} y={430} label={"Emitted"} value={emittedFromSurface}/>
                    <Label x={800} y={270} label={"Absorbed"} value={longwaveAbsorbedByAtmosphere}/>
                    <Label x={900} y={30} label={"Through window"} value={throughWindow}/>

                    {/*Convection & Latent Heat*/}
                    <ConvectionArrow x={500} y={300} value={convectionValue}/>
                    <Slider x={500} y={350} label={"Convection & Latent Heat"} value={convectionValue}
                            onChange={handleConvectionSliderChange}/>
                    {/*Surface*/}
                    <Label x={500} y={530} label={"GMST"} value={0}/>
                    {/*Space*/}
                    <Label x={300} y={62} label={"Incoming solar radiation"} value={100}/>
                </div>
            </div>
        </div>
    );
}

export default App;
