
const cardsContainer = document.getElementById("cards");
const zones = document.querySelectorAll(".dropzone");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const messageElement = document.getElementById("message");
const finishElement = document.getElementById("finish");

let score = 0;
let classified = 0;
let selectedCard = null;

// Mélange les éléments à chaque nouvelle partie.
function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Actualise le score.
function updateScore() {
  scoreElement.textContent = `Score : ${score} / 20`;

  progressElement.textContent =
    `Éléments classés : ${classified} / 20`;

  if (classified === 20) {
    finishElement.style.display = "block";

    finishElement.textContent =
      `Activité terminée ! Ton résultat est de ${score} / 20 points.`;

    messageElement.textContent =
      "Bravo, tu as classé tous les éléments !";
  }
}

// Vérifie la réponse.
function placeCard(card, zone) {

  if (!card || card.dataset.done === "true") return;

  const isCorrect =
    card.dataset.type === zone.dataset.category;

  if (isCorrect) {

    card.dataset.done = "true";

    card.classList.remove("wrong");
    card.classList.add("correct");

    card.draggable = false;

    card.setAttribute(
      "aria-label",
      card.textContent + ", bonne réponse"
    );

    zone.querySelector(".placed").appendChild(card);

    score++;
    classified++;

    messageElement.textContent =
      `Bonne réponse : ${card.textContent} ! +1 point`;

    selectedCard = null;

    updateScore();

  } else {

    card.classList.add("wrong");

    messageElement.textContent =
      `Pas tout à fait ! ${card.textContent} n'est pas dans la bonne catégorie. Réessaie.`;

    setTimeout(() => {
      card.classList.remove("wrong");
    }, 650);
  }
}

// Crée les cartes.
function createCard(item) {

  const card = document.createElement("button");

  card.type = "button";
  card.className = "card";
  card.textContent = item.name;

  card.draggable = true;

  card.dataset.type = item.type;
  card.dataset.done = "false";

  // Gestion du glisser-déposer.
  card.addEventListener("dragstart", event => {

    event.dataTransfer.setData(
      "text/plain",
      item.name
    );

    selectedCard = card;
  });

  // Possibilité de cliquer sur une carte.
  card.addEventListener("click", () => {

    if (card.dataset.done === "true") return;

    selectedCard = card;

    messageElement.textContent =
      `${item.name} sélectionné(e). Choisis une catégorie.`;

    document.querySelectorAll(".card").forEach(c => {
      c.style.outline = "";
    });

    card.style.outline = "3px solid #f0b429";
  });

  return card;
}

// Configure les zones de dépôt.
zones.forEach(zone => {

  zone.addEventListener("dragover", event => {
    event.preventDefault();
    zone.classList.add("over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });

  zone.addEventListener("drop", event => {

    event.preventDefault();

    zone.classList.remove("over");

    const name =
      event.dataTransfer.getData("text/plain");

    const card = [...document.querySelectorAll(".card")]
      .find(c => c.textContent === name);

    if (card) {
      placeCard(card, zone);
    }
  });

  // Clic sur une catégorie après avoir sélectionné une carte.
  zone.addEventListener("click", () => {

    if (selectedCard) {

      placeCard(selectedCard, zone);

      selectedCard.style.outline = "";
    }
  });

  // Accessibilité au clavier.
  zone.addEventListener("keydown", event => {

    if (
      (event.key === "Enter" || event.key === " ") &&
      selectedCard
    ) {

      event.preventDefault();

      placeCard(selectedCard, zone);

      selectedCard.style.outline = "";
    }
  });

});

// Lance ou recommence une partie.
function startGame() {

  score = 0;
  classified = 0;
  selectedCard = null;

  cardsContainer.innerHTML = "";

  document.querySelectorAll(".placed").forEach(container => {
    container.innerHTML = "";
  });

  messageElement.textContent = "";

  finishElement.style.display = "none";

  shuffle(items).forEach(item => {

    cardsContainer.appendChild(
      createCard(item)
    );

  });

  updateScore();
}

// Bouton recommencer.
document.getElementById("reset")
  .addEventListener("click", startGame);

// Démarrage automatique.
startGame();
