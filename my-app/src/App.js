import React, {useState} from 'react';
import './App.css';
import Slider from './components/Slider';
import Label from './components/Label';
import ShortwaveArrows from './components/ShortwaveArrows';

function App() {
    const [slider1Value, setSlider1Value] = useState(22);
    const [slider2Value, setSlider2Value] = useState(9);
    const [slider3Value, setSlider3Value] = useState(20);

    const handleSliderChange = (slider, newValue) => {
        if (slider === 1) {
            setSlider1Value(newValue);
            constrain(slider2Value, setSlider2Value, slider3Value, setSlider3Value, 100 - newValue);
        } else if (slider === 2) {
            setSlider2Value(newValue);
            constrain(slider1Value, setSlider1Value, slider3Value, setSlider3Value, 100 - newValue);
        } else if (slider === 3) {
            setSlider3Value(newValue);
            constrain(slider1Value, setSlider1Value, slider2Value, setSlider2Value, 100 - newValue);
        }

        function constrain(value1, setter1, value2, setter2, budget) {
            if (value1 + value2 > budget) {
                const newValue1 = Math.round(budget / 2);
                setter1(newValue1);
                setter2(budget - newValue1);
            }
        }
    };

    return (
        <div className="App">
            <ShortwaveArrows x={0} y={100} scattered={slider1Value} reflected={slider2Value} atmosphere={slider3Value} />
            <Label x={205} y={95} label={"Incoming solar radiation"} value={100}/>
            <Slider x={75} y={208 + slider1Value / 2} label={"Reflected by clouds"} value={slider1Value} onChange={(newValue) => handleSliderChange(1, newValue)}/>
            <Slider x={75} y={400} label={"Reflected by surface"} value={slider2Value} onChange={(newValue) => handleSliderChange(2, newValue)}/>
            <Slider x={300} y={250} label={"Absorbed by atmosphere"} value={slider3Value} onChange={(newValue) => handleSliderChange(3, newValue)}/>
            <Label x={300} y={600} label={"Absorbed by surface"} value={100 - slider1Value - slider2Value - slider3Value}/>
        </div>
    );
}

export default App;
