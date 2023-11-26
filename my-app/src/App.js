import React, {useState} from 'react';
import './App.css';
import Slider from './components/Slider';

function App() {
    const [slider1Value, setSlider1Value] = useState(33);
    const [slider2Value, setSlider2Value] = useState(33);
    const [slider3Value, setSlider3Value] = useState(33);

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
            <Slider x={100} y={200} label={"Reflected by clouds"} value={slider1Value} onChange={(newValue) => handleSliderChange(1, newValue)}/>
            <Slider x={100} y={400} label={"Reflected by surface"} value={slider2Value} onChange={(newValue) => handleSliderChange(2, newValue)}/>
            <Slider x={300} y={300} label={"Absorbed by atmosphere"} value={slider3Value} onChange={(newValue) => handleSliderChange(3, newValue)}/>
        </div>
    );
}

export default App;
