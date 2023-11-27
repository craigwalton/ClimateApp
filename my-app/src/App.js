import React, {useState} from 'react';
import './App.css';
import Slider from './components/Slider';
import Label from './components/Label';
import ShortwaveArrows from './components/ShortwaveArrows';

function App() {
    const defaultScatteredValue = 22;
    const defaultReflectedValue = 9;
    const defaultAtmosphereValue = 20;
    const [scatteredValue, setScatteredValue] = useState(defaultScatteredValue);
    const [reflectedValue, setReflectedValue] = useState(defaultReflectedValue);
    const [atmosphereValue, setAtmosphereValue] = useState(defaultAtmosphereValue);

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
    }

    const totalReflected = scatteredValue + reflectedValue;
    const absorbedBySurface = 100 - totalReflected - atmosphereValue;
    const scale = 500 / 600;
    return (
        <div className="App">
            <button type="button" onClick={reset}>Reset</button>
            <ShortwaveArrows x={0} y={100} scattered={scatteredValue} reflected={reflectedValue} atmosphere={atmosphereValue} />
            <Label x={205} y={95} label={"Incoming solar radiation"} value={100}/>
            <Slider x={75} y={210 + scatteredValue / 2 * scale} label={"Reflected by clouds"} value={scatteredValue} onChange={handleScatteredSliderChange}/>
            <Slider x={75} y={393 - reflectedValue / 2 * scale} label={"Reflected by surface"} value={reflectedValue} onChange={handleReflectedSliderChange}/>
            <Slider x={300} y={250} label={"Absorbed by atmosphere"} value={atmosphereValue} onChange={handleAtmosphereSliderChange}/>
            <Label x={174 + (totalReflected + (100 - atmosphereValue)) / 2 * scale} y={450} label={"Absorbed by surface"} value={absorbedBySurface}/>
            <Label x={(58 - totalReflected / 2) * scale} y={95} label={"Reflected to space"} value={totalReflected}/>
        </div>
    );
}

export default App;
