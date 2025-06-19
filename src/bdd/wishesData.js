
export const wishes = [
  // Souhaits optimaux
  {
    label: "Salle polyvalente",
    category: "Loisir",
    type: "optimal",
    remarks: "",
  },
  {
    label: "Mobilité alternative à la voiture",
    category: "Mobilité",
    type: "optimal",
    remarks: "",
  },
  {
    label: "Piste cyclable",
    category: "Voirie",
    type: "optimal",
    remarks: "À déterminer en fonction des voiries existantes",
  },
  {
    label: "Habitat participatif",
    category: "Logement",
    type: "optimal",
    remarks: "Si c’est dans un bâtiment existant",
  },

  // Souhaits ambigus / non optimaux
  {
    label: "Covoiturage",
    category: "Mobilité",
    type: "ambigu",
    remarks: "",
  },
  {
    label: "Aire de sport",
    category: "Loisir",
    type: "ambigu",
    remarks: "Pertinent en fonction de sa localisation",
  },
  {
    label: "Tiny house / habitat léger",
    category: "Logement",
    type: "ambigu",
    remarks: "Groupe d’habitats ; attention aux services environnants",
  },

  
  // Souhaits pièges
  {
    label: "Patinoire",
    category: "Loisir",
    type: "piege",
    remarks: "",
  },
  {
    label: "Piscine municipale",
    category: "Loisir",
    type: "piege",
    remarks: "Attention au contexte territorial",
  },
  {
    label: "Lotissement pavillonnaire",
    category: "Logement",
    type: "piege",
    remarks: "Groupe d’habitats ; déterminer un nombre d’unités de logement minimum",
  },
];
