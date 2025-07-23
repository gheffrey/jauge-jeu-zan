// src/App.js 
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Gauge from './components/Gauge';
import ModalStep from './components/ModalStep';
import TurnSummaryModal from './components/TurnSummaryModal';
import EndGameSummary from './components/EndGameSummary';
import { computeGaugeVariations } from './logic/evaluateTurn';
import { countWinningTriplets, evaluateEachTriplet } from './logic/evaluateTriplets';

function App() {
  const [wellbeing, setWellbeing] = useState(0);
  const [biodiversity, setBiodiversity] = useState(0);
  const [landUse, setLandUse] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [lastTurnSummary, setLastTurnSummary] = useState(null);
  const [history, setHistory] = useState([]);

  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const startTimeRef = useRef(Date.now());

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
    const evaluatedTriplets = evaluateEachTriplet(formData.triplets || []);

    const summary = {
      tour: currentStep + 1,
      wellbeing: variations.wellbeing,
      biodiversity: variations.biodiversity,
      landUse: variations.landUse,
      finalWellbeing: wellbeing + variations.wellbeing,
      finalBiodiversity: biodiversity + variations.biodiversity,
      finalLandUse: landUse + variations.landUse,
      time: Date.now() - startTimeRef.current,
      triplets: evaluatedTriplets
    };

    setWellbeing(prev => Math.min(100, Math.max(0, prev + variations.wellbeing)));
    setBiodiversity(prev => Math.min(100, Math.max(0, prev + variations.biodiversity)));
    setLandUse(prev => Math.min(100, Math.max(0, prev + variations.landUse)));

    setLastTurnSummary(summary);
    setHistory(prev => [...prev, summary]);
    setShowSummaryModal(true);
    setShowModal(false);
  };

  const handleSummaryClose = () => {
    setShowSummaryModal(false);

    if (currentStep === 3) {
      setShowFinalSummary(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <Router>
      <div className="App">
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
            alt="artificialisation"
            label="Artificialisation"
            value={landUse}
            onChange={setLandUse}
          />
        </div>

        {currentStep < 4 && !showFinalSummary ? (
          <div className="center-button">
            <button onClick={() => {
              setShowModal(true);
              startTimeRef.current = Date.now();
            }}>Fin du tour</button>
          </div>
        ) : (
          showFinalSummary && <EndGameSummary history={history} />
        )}

        <ModalStep
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleModalSubmit}
        />

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
