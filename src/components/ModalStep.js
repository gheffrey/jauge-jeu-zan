// src/components/ModalStep.js
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import '../ModalStep.css';

Modal.setAppElement('#root');




export default function ModalStep({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTripletChange = (index, field, value) => {
    const updatedTriplets = [...(formData.triplets || [])];
    updatedTriplets[index][field] = value;
    setFormData((prev) => ({ ...prev, triplets: updatedTriplets }));
  };

  const addTriplet = () => {
    const newTriplet = { ilot: '', public_space: '', vegetation: '' };
    setFormData((prev) => ({
      ...prev,
      triplets: [...(prev.triplets || []), newTriplet],
    }));
  };

  const removeTriplet = (index) => {
    const updatedTriplets = [...(formData.triplets || [])];
    updatedTriplets.splice(index, 1);
    setFormData((prev) => ({ ...prev, triplets: updatedTriplets }));
  };


  /**valisation auto des champs */
  const [isFormValid, setIsFormValid] = useState(false);

useEffect(() => {
  const allFieldsFilled =
    formData.etale !== '' &&
    formData.renature !== '' &&
    formData.parcs !== '' &&
    formData.vetuste &&
    formData.patrimoines &&
    formData.ilotChaleur &&
    (formData.triplets || []).every(t => t.ilot && t.public_space && t.vegetation);

  setIsFormValid(allFieldsFilled);
}, [formData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Fin de tour"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Un instant !</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label>
          De combien de parcelles vous êtes-vous étalé ?
          <input type="number" name="etale" value={formData.etale || ''} onChange={handleChange} />
        </label>

        <label>
          Combien de parcelles avez-vous renaturé ?
          <input type="number" name="renature" value={formData.renature || ''} onChange={handleChange} />
        </label>

        <label>
          Combien de parcs nouvellement construits ?
          <input type="number" name="parcs" value={formData.parcs || ''} onChange={handleChange} />
        </label>

        <label>
          Y a-t-il encore de la vétusté ou de la vacance ?
          <select name="vetuste" value={formData.vetuste || ''} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </label>

        <label>
          Avez-vous conservé tous les patrimoines ?
          <select name="patrimoines" value={formData.patrimoines || ''} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </label>

        <label>
          Avez-vous traité tous les îlots de chaleur ?
          <select name="ilotChaleur" value={formData.ilotChaleur || ''} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </label>

        <div className="triplets-section">
          <h3>Triplets de conception</h3>
          {(formData.triplets || []).map((triplet, index) => (
            <div key={index} className="triplet-inputs">
              <input
                type="text"
                maxLength={1}
                placeholder="Forme d'îlot - en lettre"
                value={triplet.ilot}
                onChange={(e) => handleTripletChange(index, 'ilot', e.target.value)}
              />
              <input
                type="number"
                placeholder="Espace public - en entier naturel"
                value={triplet.public_space}
                onChange={(e) => handleTripletChange(index, 'public_space', e.target.value)}
              />
              <input
                type="number"
                placeholder="Végétalisation - en entier naturel"
                value={triplet.vegetation}
                onChange={(e) => handleTripletChange(index, 'vegetation', e.target.value)}
              />
              <button type="button" onClick={() => removeTriplet(index)}>Retirer</button>
            </div>
          ))}
          <button type="button" onClick={addTriplet}>Ajouter un triplet</button>
        </div>

        <div className="modal-actions">
<button type="submit" disabled={!isFormValid}>Valider</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </Modal>
  );
}
