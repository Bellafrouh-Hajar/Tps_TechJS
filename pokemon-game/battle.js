// Module de combat — gère les attaques et les dégâts

function calculateDamage(move, attackerPP, defenderPP) {
  // Si le PP de l'attaquant est inférieur à celui de l'adversaire, l'attaque échoue
  if (attackerPP < defenderPP) {
    return { damage: 0, missed: false, blocked: true };
  }

  // Vérification de la précision (accuracy est sur 100)
  const roll = Math.random() * 100;
  if (roll > move.accuracy) {
    return { damage: 0, missed: true, blocked: false };
  }

  // Les dégâts sont basés sur la puissance du move (power peut être null)
  const power = move.power || 40;
  const damage = Math.floor(power / 10) + Math.floor(Math.random() * 5);

  return { damage, missed: false, blocked: false };
}

function pickRandomMove(moves) {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

module.exports = { calculateDamage, pickRandomMove };