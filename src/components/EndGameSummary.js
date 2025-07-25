// src/components/EndGameSummary.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function calculateAverage(history, key) {
  const total = history.reduce((acc, t) => acc + t[key], 0);
  return total / history.length;
}

function normalizeScore(value, key) {
  // Normalise chaque jauge sur une échelle de 0 à 100
  if (key === 'finalWellbeing') {
    return Math.max(0, Math.min(100, value)); // clamp
  } else if (key === 'finalBiodiversity') {
    return Math.max(0, Math.min(100, (value + 100) / 2)); // suppose valeur entre -100 et +100
  } else if (key === 'finalLandUse') {
    return Math.max(0, Math.min(100, 100 - value)); // moins = mieux
  }
  return 0;
}

function getBadge(normWellbeing, normBiodiversity, normLandUse) {
  const globalScore = (normWellbeing + normBiodiversity + normLandUse) / 3;

  if (globalScore >= 80) return { label: '🏅 Expert du ZAN !', color: '#2e8b57' };
  if (globalScore >= 60) return { label: '👍 Plutôt rusé !', color: '#daa520' };
  return { label: '⚠️ À améliorer...', color: '#b22222' };
}

export default function EndGameSummary({ history }) {
  const totalTime = history.reduce((acc, t) => acc + t.time, 0);

  const avgWellbeing = calculateAverage(history, 'finalWellbeing');
  const avgBiodiversity = calculateAverage(history, 'finalBiodiversity');
  const avgLandUse = calculateAverage(history, 'finalLandUse');

  // Normalisation
  const normWellbeing = normalizeScore(avgWellbeing, 'finalWellbeing');
  const normBiodiversity = normalizeScore(avgBiodiversity, 'finalBiodiversity');
  const normLandUse = normalizeScore(avgLandUse, 'finalLandUse');

  const badge = getBadge(normWellbeing, normBiodiversity, normLandUse);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Résumé des tours ZAN', 20, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Tour', 'Bien-être', 'Biodiversité', 'Artificialisation', 'Durée (s)']],
      body: history.map(t => [
        t.tour,
        t.finalWellbeing,
        t.finalBiodiversity,
        t.finalLandUse,
        (t.time / 1000).toFixed(1),
      ]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Temps total (s)', 'Moy. Bien-être', 'Moy. Biodiversité', 'Moy. Artif.', 'Badge']],
      body: [[
        (totalTime / 1000).toFixed(1),
        normWellbeing.toFixed(1),
        normBiodiversity.toFixed(1),
        normLandUse.toFixed(1),
        badge.label
      ]],
    });

    doc.save('zan_resume_final.pdf');
  };

  return (
    <div className="end-summary">
      <h2>Synthèse finale</h2>
      <ul>
        {history.map((t, i) => (
          <li key={i}>
            <strong>Tour {t.tour}</strong> — Bien-être : {t.finalWellbeing}, Biodiversité : {t.finalBiodiversity}, Artificialisation : {t.finalLandUse}, Temps : {(t.time / 1000).toFixed(1)}s
          </li>
        ))}
      </ul>

      <h3>Temps de jeu : {(totalTime / 1000).toFixed(1)} secondes</h3>
      <h3>Moyennes normalisées sur 100 :</h3>
      <ul>
        <li>Bien-être : {normWellbeing.toFixed(1)}</li>
        <li>Biodiversité : {normBiodiversity.toFixed(1)}</li>
        <li>Artificialisation (inverse) : {normLandUse.toFixed(1)}</li>
      </ul>

      <h2 style={{ color: badge.color }}>{badge.label}</h2>

      <button onClick={exportPDF} style={{ margin: '20px' }}>
        📄 Télécharger le résumé en PDF
      </button>
    </div>
  );
}
