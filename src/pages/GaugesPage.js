import { useState } from 'react';
import Gauge from '../components/Gauge'; 

export default function JaugesPage() {
  const [wellbeing, setWellbeing] = useState(70);
  const [biodiversity, setBiodiversity] = useState(40);
  const [landUse, setLandUse] = useState(90);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Gauge
          src="/wellbeing.png"
          alt="Jauge bien être"
          label="Bien être"
          value={wellbeing}
          onChange={setWellbeing}
        />
        <Gauge
          src="/biodiversity.png"
          alt="Jauge biodiversité"
          label="Biodiversité"
          value={biodiversity}
          onChange={setBiodiversity}
        />
        <Gauge
          src="/landuse.png"
          alt="Occupation du sol"
          label="Occupation du sol"
          value={landUse}
          onChange={setLandUse}
        />
      </aside>

      <main className="main-panel">
        <h2>Simulation dynamique des jauges</h2>
        <p>Tu peux maintenant ajouter ici des algorithmes pour faire varier les jauges automatiquement ou selon des règles spécifiques.</p>
        {/* Exemple futur : boutons de test, ou effet aléatoire */}
      </main>
    </div>
  );
}
