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
        <h1>Tableau de bord environnemental</h1>
        <div className="dashboard">
          <Gauge
            src="/wellbeing.png"
            alt="Jauge bien être"
            label="Jauge bien être"
            value={wellbeing}
            onChange={setWellbeing}
          />
          <Gauge
            src="/biodiversity.png"
            alt="Jauge biodiversité"
            label="Jauge biodiversité"
            value={biodiversity}
            onChange={setBiodiversity}
          />
          <Gauge
            src="/landuse.png"
            alt="Taux d’occupation du sol"
            label="Taux d’occupation du sol"
            value={landUse}
            onChange={setLandUse}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
