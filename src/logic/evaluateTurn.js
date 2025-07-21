import { countWinningTriplets } from './evaluateTriplets';

export function computeGaugeVariations(formData) {
  const etale = parseInt(formData.etale || 0);      // étalement
  const renature = parseInt(formData.renature || 0); // renaturation
  const parcs = parseInt(formData.parcs || 0);       // parcs construits

  // Initialisation
  let wellbeing = 0;
  let biodiversity = 0;
  let landUse = 0;

  // Étalement
  landUse -= etale * 10;
  biodiversity -= etale * 5;

  // Renaturation
  landUse += renature * 5;
  biodiversity += renature * 3;

  // Parcs construits
  landUse += parcs * 3;
  wellbeing += parcs * 5;
  biodiversity += parcs * 3;

  // Vétusté ou vacance
  if (formData.vetuste === 'oui') {
    wellbeing -= 5;
    biodiversity -= 5;
  }

  // Patrimoines non conservés
  if (formData.patrimoines === 'non') {
    wellbeing -= 5;
    biodiversity -= 5;
  }

  // Îlots de chaleur non traités
  if (formData.ilotChaleur === 'non') {
    wellbeing -= 3;
    biodiversity -= 3;
  }

  // Bonus triplets gagnants
  const tripletBonus = countWinningTriplets(formData.triplets || []) * 5;
  biodiversity += tripletBonus;

  return {
    wellbeing,
    biodiversity,
    landUse,
  };
}
