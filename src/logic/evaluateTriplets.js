import { winningTriplets1, winningTriplets2 } from '../data/rules';

function areTripletsEqual(a, b) {
  return (
    a.ilot.toUpperCase() === b.ilot.toUpperCase() &&
    parseInt(a.public_space) === parseInt(b.public_space) &&
    parseInt(a.vegetation) === parseInt(b.vegetation)
  );
}

export function isWinningTriplet(triplet) {
  return (
    winningTriplets1.some((t) => areTripletsEqual(t, triplet)) ||
    winningTriplets2.some((t) => areTripletsEqual(t, triplet))
  );
}

export function countWinningTriplets(triplets) {
  return triplets.filter(isWinningTriplet).length;
}
