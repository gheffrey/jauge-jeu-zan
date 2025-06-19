import { useState } from 'react';
import WishCard from '../components/WishCard';

const wishes = [
  { label: "Salle polyvalente", category: "Loisir", remarks: "" },
  { label: "Parc urbain", category: "Loisir", remarks: "" },
  { label: "Loisir nautique", category: "Loisir", remarks: "" },
  { label: "Mobilité alternative à la voiture", category: "Mobilité", remarks: "" },
  { label: "Piste cyclable", category: "Voirie", remarks: "À déterminer en fonction des voiries existantes" },
  { label: "Habitat participatif", category: "Logement", remarks: "Si c’est dans un bâtiment existant" },
  { label: "Covoiturage", category: "Mobilité", remarks: "" },
  { label: "Aire de sport", category: "Loisir", remarks: "Pertinent en fonction de sa localisation" },
  { label: "Tiny house / habitat léger", category: "Logement", remarks: "Groupe d’habitats ; attention aux services environnants" },
  { label: "Patinoire", category: "Loisir", remarks: "" },
  { label: "Piscine municipale", category: "Loisir", remarks: "Attention au contexte territorial" },
  { label: "Lotissement pavillonnaire", category: "Logement", remarks: "Groupe d’habitats ; déterminer un nombre d’unités de logement minimum" },
  { label: "Parking sous-terrain", category: "Infrastructure", remarks: "" },
];

export default function WishesPage() {
  const [selected, setSelected] = useState([]);
  const [priority, setPriority] = useState(null);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleToggleWish = (label) => {
    let newSelected;

    if (selected.includes(label)) {
      newSelected = selected.filter(item => item !== label);
    } else if (selected.length < 3) {
      newSelected = [...selected, label];
    } else {
      return;
    }

    setSelected(newSelected);

    if (newSelected.length === 1) {
      setPriority(newSelected[0]);
    } else if (!newSelected.includes(priority)) {
      setPriority(null);
    }
  };

  const handlePriorityChange = (label, checked) => {
    if (checked) {
      setPriority(label);
    } else if (priority === label) {
      setPriority(null);
    }
  };

  const isValid =
    selected.length === 1 || (selected.length >= 2 && selected.includes(priority));

  const handleValidateClick = () => {
    if (!isValid) {
      if (selected.length === 0) {
        setError("Veuillez sélectionner au moins un souhait.");
      } else if (selected.length >= 2 && !priority) {
        setError("Veuillez sélectionner un souhait prioritaire.");
      }
      setTimeout(() => setError(''), 4000);
      return;
    }

    const message = `✅ Souhaits validés : ${selected.join(', ')}. Prioritaire : ${priority}`;
    setConfirmation(message);
    setTimeout(() => setConfirmation(''), 5000);
  };

  return (
    <main className="main-panel">
      <h2>Souhaits des habitants (max. 3)</h2>

      <div className="wishes-container">
        {wishes.map((wish, index) => {
          const isSelected = selected.includes(wish.label);
          const isDisabled = selected.length >= 3 && !isSelected;

          return (
            <WishCard
              key={index}
              wish={wish}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => handleToggleWish(wish.label)}
              showPriority={selected.length >= 2}
              isPriority={priority === wish.label}
              onPriorityChange={handlePriorityChange}
              autoPriority={selected.length === 1}
            />
          );
        })}
      </div>

      {error && (
        <div className="error-popup">
          ⚠️ {error}
        </div>
      )}

      {confirmation && (
        <div className="success-popup">
          {confirmation}
        </div>
      )}

      <div className="validate-container">
        <button
          className={`validate-button ${isValid ? 'active' : 'disabled'}`}
          onClick={handleValidateClick}
        >
          Valider
        </button>
      </div>
    </main>
  );
}
