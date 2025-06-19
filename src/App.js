// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WishesPage from './pages/WishesPage';
import Gauge from './components/Gauge';
import { useState } from 'react';

function App() {
  const [wellbeing, setWellbeing] = useState(70);
  const [biodiversity, setBiodiversity] = useState(40);
  const [landUse, setLandUse] = useState(90);

  return (
    <Router>
      <div className="App">
        <header className="topbar">
          <div className="logo-container">
            <img src="/img/logo-foncier-fute.png" alt="Logo Foncier Futé" className="logo" />
          </div>
          <nav className="nav-links">
            <Link to="/">Accueil</Link>
            <Link to="/souhaits">Souhaits</Link>
            <Link to="#">Paramètres</Link>
          </nav>
        </header>

        <div className="dashboard-layout">
          {/* Sidebar visible partout */}
          <aside className="sidebar">
            <Gauge
              src="/wellbeing.png"
              alt="Jauge bien être"
              label="Bien être"
              value={wellbeing}
              onChange={setWellbeing}
              autoUpdate
            />
            <Gauge
              src="/biodiversity.png"
              alt="Jauge biodiversité"
              label="Biodiversité"
              value={biodiversity}
              onChange={setBiodiversity}
              autoUpdate
            />
            <Gauge
              src="/landuse.png"
              alt="Occupation du sol"
              label="Occupation du sol"
              value={landUse}
              onChange={setLandUse}
              autoUpdate
            />
          </aside>

          {/* Affichage dynamique de page */}
          <main className="main-panel">
            <Routes>
              <Route path="/" element={<h2>Bienvenue sur Foncier Futé</h2>} />
              <Route path="/souhaits" element={<WishesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
