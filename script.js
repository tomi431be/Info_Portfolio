
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");

const questionText = document.getElementById("question-text");
const answersBox = document.getElementById("answers");
const counter = document.getElementById("question-counter");
const scoreLabel = document.getElementById("score-label");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;

// Mélange les questions dans un ordre aléatoire.
function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Lance ou recommence le quiz.
function startQuiz() {
  shuffledQuestions = shuffle(questions);

  currentIndex = 0;
  score = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}

// Affiche la question actuelle.
function showQuestion() {
  const item = shuffledQuestions[currentIndex];

  counter.textContent =
    `Question ${currentIndex + 1} / ${shuffledQuestions.length}`;

  scoreLabel.textContent = `Score : ${score}`;

  progressBar.style.width =
    `${(currentIndex / shuffledQuestions.length) * 100}%`;

  questionText.textContent = item.question;

  answersBox.innerHTML = "";

  feedback.textContent = "";
  feedback.className = "";

  nextButton.classList.add("hidden");

  // Mélange également les réponses.
  shuffle(item.answers).forEach(answer => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      chooseAnswer(button, answer, item.correct);
    });

    answersBox.appendChild(button);
  });
}

// Vérifie la réponse choisie.
function chooseAnswer(selectedButton, answer, correctAnswer) {
  const buttons = [
    ...answersBox.querySelectorAll("button")
  ];

  buttons.forEach(button => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (answer === correctAnswer) {
    score++;

    feedback.textContent = "Bonne réponse !";
    feedback.className = "good";
  } else {
    selectedButton.classList.add("incorrect");

    feedback.textContent =
      `Pas tout à fait. La bonne réponse était : ${correctAnswer}.`;

    feedback.className = "bad";
  }

  scoreLabel.textContent = `Score : ${score}`;

  progressBar.style.width =
    `${((currentIndex + 1) / shuffledQuestions.length) * 100}%`;

  if (currentIndex === shuffledQuestions.length - 1) {
    nextButton.textContent = "Voir mon résultat";
  } else {
    nextButton.textContent = "Question suivante";
  }

  nextButton.classList.remove("hidden");
}

// Passe à la question suivante.
function nextQuestion() {
  currentIndex++;

  if (currentIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Affiche le résultat final.
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById("final-score").textContent =
    `Tu as obtenu ${score} / ${shuffledQuestions.length}.`;

  const percentage =
    Math.round((score / shuffledQuestions.length) * 100);

  let message = "Continue à t'entraîner, tu vas progresser !";

  if (percentage >= 90) {
    message = "Excellent ! Tu maîtrises très bien les types de données.";
  } else if (percentage >= 70) {
    message = "Très bien ! Tu connais déjà l'essentiel.";
  } else if (percentage >= 50) {
    message = "Bon travail ! Quelques révisions et ce sera parfait.";
  }

  document.getElementById("result-message").textContent = message;
}

// Relie les boutons aux fonctions.
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
