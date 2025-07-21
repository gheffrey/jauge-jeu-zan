// src/components/TurnSummaryModal.js
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TurnSummaryModal({ isOpen, onClose, summary }) {
  if (!summary) return null; // ✅ empêche le rendu si pas encore de résumé

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Résumé du tour {summary.tour}</h2>
      <ul>
        <li>Bien-être : {summary.wellbeing > 0 ? '+' : ''}{summary.wellbeing}</li>
        <li>Biodiversité : {summary.biodiversity > 0 ? '+' : ''}{summary.biodiversity}</li>
        <li>Artificialisation : {summary.landUse > 0 ? '+' : ''}{summary.landUse}</li>
        <li>Triplets gagnants : {summary.triplets}</li>
      </ul>
      <button onClick={onClose}>Continuer</button>
    </Modal>
  );
}
