import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function calculateAverage(history, key) {
  const total = history.reduce((acc, t) => acc + t[key], 0);
  return total / history.length;
}

function getBadge(avgWellbeing, avgBiodiversity, avgLandUse) {
  const total = avgWellbeing + avgBiodiversity + (100 - avgLandUse); // moins d'artificialisation = mieux
  const score = total / 3;

  if (score >= 80) return { label: '🏅 Expert du ZAN !', color: '#2e8b57' };
  if (score >= 60) return { label: '👍 Plutôt rusé !', color: '#daa520' };
  return { label: '⚠️ À améliorer...', color: '#b22222' };
}

export default function EndGameSummary({ history }) {
  const totalTime = history.reduce((acc, t) => acc + t.time, 0);
  const avgWellbeing = calculateAverage(history, 'finalWellbeing');
  const avgBiodiversity = calculateAverage(history, 'finalBiodiversity');
  const avgLandUse = calculateAverage(history, 'finalLandUse');

  const badge = getBadge(avgWellbeing, avgBiodiversity, avgLandUse);

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
        avgWellbeing.toFixed(1),
        avgBiodiversity.toFixed(1),
        avgLandUse.toFixed(1),
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
      <h3>Moyennes :</h3>
      <ul>
        <li>Bien-être : {avgWellbeing.toFixed(1)}</li>
        <li>Biodiversité : {avgBiodiversity.toFixed(1)}</li>
        <li>Artificialisation : {avgLandUse.toFixed(1)}</li>
      </ul>

      <h2 style={{ color: badge.color }}>{badge.label}</h2>

      <button onClick={exportPDF} style={{ margin: '20px' }}>
        📄 Télécharger le résumé en PDF
      </button>
    </div>
  );
}
