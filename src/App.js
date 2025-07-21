// src/App.js
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Gauge from './components/Gauge';
import ModalStep from './components/ModalStep';
import TurnSummaryModal from './components/TurnSummaryModal';
import { computeGaugeVariations } from './logic/evaluateTurn';
import { countWinningTriplets } from './logic/evaluateTriplets';

function App() {
  const [wellbeing, setWellbeing] = useState(0);
  const [biodiversity, setBiodiversity] = useState(0);
  const [landUse, setLandUse] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(0); // 🔁 Tour actuel
  const [lastTurnSummary, setLastTurnSummary] = useState(null);
  const [history, setHistory] = useState([]); // Pour stocker tous les tours

  const [formData, setFormData] = useState({
    etale: '',
    renature: '',
    parcs: '',
    vetuste: '',
    patrimoines: '',
    ilotChaleur: '',
    triplets: [{ ilot: '', public_space: '', vegetation: '' }],
  });

  useEffect(() => {
    setBiodiversity(50);
    setWellbeing(50);
    setLandUse(50);
  }, []);

  const handleModalSubmit = () => {
    const variations = computeGaugeVariations(formData);
    const tripletCount = countWinningTriplets(formData.triplets || []);

    const summary = {
      wellbeing: variations.wellbeing,
      biodiversity: variations.biodiversity,
      landUse: variations.landUse,
      triplets: tripletCount,
      tour: currentStep + 1,
    };

    // Appliquer les variations aux jauges
    setWellbeing(prev => Math.min(100, Math.max(0, prev + variations.wellbeing)));
    setBiodiversity(prev => Math.min(100, Math.max(0, prev + variations.biodiversity)));
    setLandUse(prev => Math.min(100, Math.max(0, prev + variations.landUse)));

    // Afficher résumé + stocker l’historique
    setLastTurnSummary(summary);
    setHistory(prev => [...prev, summary]);
    setShowSummaryModal(true);
    setShowModal(false);
  };

  const handleSummaryClose = () => {
    setShowSummaryModal(false);
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <Router>
      <div className="App">
        {/* ✅ Barre de progression */}
        <div className="progress-bar-container">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''}`}
            >
              Tour {step + 1}
            </div>
          ))}
        </div>

        {/* ✅ Jauges */}
        <div className="dashboard-layout">
          <Gauge
            src="/wellbeing.png"
            alt="Jauge bien-être"
            label="Bien-être"
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
            alt="Artificialisation"
            label="Artificialisation"
            value={landUse}
            onChange={setLandUse}
          />
        </div>

        {/* ✅ Bouton de fin de tour */}
        {currentStep < 4 ? (
          <div className="center-button">
            <button onClick={() => setShowModal(true)}>Fin du tour</button>
          </div>
        ) : (
          <div className="final-summary">
            <h2>Résumé final</h2>
            <ul>
              {history.map((tour, index) => (
                <li key={index}>
                  <strong>Tour {tour.tour}</strong> — Bien-être : {tour.wellbeing}, Biodiversité : {tour.biodiversity}, Artificialisation : {tour.landUse}, Triplets gagnants : {tour.triplets}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Modal de formulaire */}
        <ModalStep
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleModalSubmit}
        />

        {/* ✅ Modal résumé de tour */}
        <TurnSummaryModal
          isOpen={showSummaryModal}
          onClose={handleSummaryClose}
          summary={lastTurnSummary}
        />
      </div>
    </Router>
  );
}

export default App;
