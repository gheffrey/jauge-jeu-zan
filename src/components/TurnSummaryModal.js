// src/components/TurnSummaryModal.js
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TurnSummaryModal({ isOpen, onClose, summary }) {
  if (!summary) return null;

  const {
    tour,
    wellbeing,
    biodiversity,
    landUse,
    triplets = []
  } = summary;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2>Résumé du tour {tour}</h2>
        <ul>
          <li>Bien-être : {wellbeing > 0 ? '+' : ''}{wellbeing}</li>
          <li>Biodiversité : {biodiversity > 0 ? '+' : ''}{biodiversity}</li>
          <li>Artificialisation : {landUse > 0 ? '+' : ''}{landUse}</li>
        </ul>

        {triplets.length > 0 ? (
          <div>
            <h3>Triplets analysés :</h3>
            <ul className="triplet-list">
              {triplets.map((t, idx) => (
                <li key={idx} className={`triplet ${t.status}`}>
                  <div><strong>{t.ilot} - {t.public_space} - {t.vegetation}</strong></div>
                  <div>Score : <strong>{t.score}</strong></div>
                  <div>{t.message}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={onClose}>Continuer</button>
        </div>
      </div>
    </Modal>
  );
}
