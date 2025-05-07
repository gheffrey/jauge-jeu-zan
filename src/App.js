import './App.css';
import { useState } from 'react';

function Gauge({ src, alt, label, value, onChange }) {
  return (
    <div className="gauge">
      <div className="gauge-container">
        <img src={src} alt={alt} className="gauge-image" />
        <div
          className="gauge-overlay"
          style={{ height: `${100 - value}%` }}
        />
      </div>
      <p>{label} : {value}%</p>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
      />
    </div>
  );
}

function App() {
  const [wellbeing, setWellbeing] = useState(70);
  const [biodiversity, setBiodiversity] = useState(40);
  const [landUse, setLandUse] = useState(90);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
