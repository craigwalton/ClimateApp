import './App.css';
import Slider from './components/Slider';

function App() {
    return (
        <div className="App">
            <Slider x={100} y={200} label={"Reflected by clouds"}/>
            <Slider x={100} y={400} label={"Reflected by surface"}/>
            <Slider x={300} y={300} label={"Absorbed by atmosphere"}/>
        </div>
    );
}

export default App;
