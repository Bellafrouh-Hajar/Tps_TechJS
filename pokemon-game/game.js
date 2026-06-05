const inquirer = require("inquirer");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { calculateDamage, pickRandomMove } = require("./battle");

const BASE_URL = "https://pokeapi.co/api/v2";
const MAX_HP = 300;

// Récupère les données d'un Pokémon depuis l'API
async function fetchPokemon(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error(`Pokémon "${name}" introuvable.`);
  const data = await res.json();

  // On récupère jusqu'à 5 moves avec leurs détails
  const movesRaw = data.moves.slice(0, 5);
  const moves = await Promise.all(
    movesRaw.map(async (m) => {
      const moveRes = await fetch(m.move.url);
      const moveData = await moveRes.json();
      return {
        name: moveData.name,
        power: moveData.power,
        accuracy: moveData.accuracy || 100,
        pp: moveData.pp,
      };
    })
  );

  return {
    name: data.name,
    hp: MAX_HP,
    moves,
  };
}

// Affiche la barre de HP
function displayHP(pokemon) {
  const bar = Math.floor((pokemon.hp / MAX_HP) * 20);
  const filled = "█".repeat(bar);
  const empty = "░".repeat(20 - bar);
  const color = pokemon.hp > 150 ? chalk.green : pokemon.hp > 75 ? chalk.yellow : chalk.red;
  console.log(`${chalk.bold(pokemon.name.toUpperCase())}: ${color(filled + empty)} ${pokemon.hp}/${MAX_HP} HP`);
}

// Tour du joueur
async function playerTurn(player, bot) {
  const { move: chosenMoveName } = await inquirer.prompt([
    {
      type: "list",
      name: "move",
      message: chalk.cyan("Choisissez votre attaque :"),
      choices: player.moves.map((m) => ({
        name: `${m.name} (power: ${m.power ?? "?"}, accuracy: ${m.accuracy}%, pp: ${m.pp})`,
        value: m.name,
      })),
    },
  ]);

  const move = player.moves.find((m) => m.name === chosenMoveName);
  const botMove = pickRandomMove(bot.moves);

  const result = calculateDamage(move, move.pp, botMove.pp);

  if (result.blocked) {
    console.log(chalk.red(`⚠️  Votre PP (${move.pp}) est inférieur à celui de l'adversaire (${botMove.pp}). Attaque bloquée !`));
  } else if (result.missed) {
    console.log(chalk.yellow("💨 L'attaque a raté !"));
  } else {
    bot.hp = Math.max(0, bot.hp - result.damage);
    console.log(chalk.green(`✅ ${move.name} inflige ${result.damage} dégâts au bot !`));
  }
}

// Tour du bot
function botTurn(bot, player) {
  const botMove = pickRandomMove(bot.moves);
  const playerMove = pickRandomMove(player.moves);

  const result = calculateDamage(botMove, botMove.pp, playerMove.pp);

  if (result.blocked) {
    console.log(chalk.gray(`🤖 Le bot tente ${botMove.name} mais est bloqué (PP trop faible) !`));
  } else if (result.missed) {
    console.log(chalk.yellow(`🤖 Le bot utilise ${botMove.name} mais rate !`));
  } else {
    player.hp = Math.max(0, player.hp - result.damage);
    console.log(chalk.red(`🤖 Le bot utilise ${botMove.name} et inflige ${result.damage} dégâts !`));
  }
}

// Boucle principale du jeu
async function startGame() {
  console.log(chalk.bold.yellow("\n🎮 Bienvenue dans le jeu Pokémon CLI !\n"));

  const { pokemonName } = await inquirer.prompt([
    {
      type: "input",
      name: "pokemonName",
      message: "Entrez le nom de votre Pokémon (ex: pikachu, bulbasaur, charmander) :",
    },
  ]);

  console.log(chalk.blue("\n⏳ Chargement des données Pokémon..."));

  let player, bot;

  try {
    player = await fetchPokemon(pokemonName);
  } catch (e) {
    console.log(chalk.red(e.message));
    return;
  }

  // Le bot choisit un Pokémon aléatoire parmi une liste
  const botList = ["gengar", "mewtwo", "snorlax", "gyarados", "machamp"];
  const botName = botList[Math.floor(Math.random() * botList.length)];
  bot = await fetchPokemon(botName);

  console.log(chalk.bold(`\n⚔️  Vous jouez avec ${chalk.green(player.name.toUpperCase())} contre ${chalk.red(bot.name.toUpperCase())} !\n`));

  // Boucle de combat
  while (player.hp > 0 && bot.hp > 0) {
    console.log("\n--- État du combat ---");
    displayHP(player);
    displayHP(bot);
    console.log("");

    await playerTurn(player, bot);

    if (bot.hp <= 0) break;

    botTurn(bot, player);
  }

  // Résultat final
  console.log("\n============================");
  if (player.hp <= 0 && bot.hp <= 0) {
    console.log(chalk.yellow("🤝 Match nul !"));
  } else if (bot.hp <= 0) {
    console.log(chalk.bold.green(`🏆 Félicitations ! ${player.name.toUpperCase()} a gagné !`));
  } else {
    console.log(chalk.bold.red(`💀 Défaite ! ${bot.name.toUpperCase()} a gagné !`));
  }
  console.log("============================\n");
}

startGame();