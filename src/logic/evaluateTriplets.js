// src/logic/evaluateTriplets.js
import { winningTriplets1, winningTriplets2 } from '../data/rules.js';

const allWinningTriplets = [...winningTriplets1, ...winningTriplets2];

function isWinningTriplet(userTriplet) {
  return allWinningTriplets.some(
    (win) =>
      win.ilot.toUpperCase() === userTriplet.ilot.toUpperCase() &&
      Number(win.public_space) === Number(userTriplet.public_space) &&
      Number(win.vegetation) === Number(userTriplet.vegetation)
  );
}

export function evaluateEachTriplet(triplets) {
  return triplets.map((triplet, index) => {
    const { ilot = '', public_space = '', vegetation = '' } = triplet;

    let score = 0;
    let correct = 0;
    let incorrect = 0;

    // On vérifie chaque composante individuellement
    const correctIlot = allWinningTriplets.some(t => t.ilot.toUpperCase() === ilot.toUpperCase());
    const correctPublic = allWinningTriplets.some(t => Number(t.public_space) === Number(public_space));
    const correctVeg = allWinningTriplets.some(t => Number(t.vegetation) === Number(vegetation));

    correct = [correctIlot, correctPublic, correctVeg].filter(Boolean).length;
    incorrect = 3 - correct;
    score = correct * 2 - incorrect;

    const isExactMatch = isWinningTriplet(triplet);

    const status = isExactMatch ? 'gagnant' : (score > 0 ? 'neutre' : 'perdant');
    const message = isExactMatch
      ? '✅ Triplet parfaitement conforme aux objectifs.'
      : score > 0
      ? '⚠️ Triplet partiellement correct.'
      : '❌ Aucun élément de ce triplet n’est correct.';

    return {
      ...triplet,
      index,
      score,
      status,
      message,
    };
  });
}

export function countWinningTriplets(triplets) {
  const evaluated = evaluateEachTriplet(triplets);
  return evaluated.filter((t) => t.status === 'gagnant').length;
}
