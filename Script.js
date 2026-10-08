/* =========================================
   HARDWARE VS SOFTWARE
   Jeu éducatif
========================================= */


/* =========================================
   QUESTIONS
========================================= */

const questions = [
    {
        question: "Le processeur (CPU) d'un ordinateur",
        answer: "hardware",
        icon: "🧠",
        explanation:
            "Le processeur est un composant physique que l'on peut toucher. C'est donc du hardware."
    },

    {
        question: "Windows",
        answer: "software",
        icon: "🪟",
        explanation:
            "Windows est un système d'exploitation. C'est un logiciel qui permet de faire fonctionner l'ordinateur."
    },

    {
        question: "Une souris d'ordinateur",
        answer: "hardware",
        icon: "🖱️",
        explanation:
            "Une souris est un périphérique physique connecté à l'ordinateur. C'est du hardware."
    },

    {
        question: "Google Chrome",
        answer: "software",
        icon: "🌐",
        explanation:
            "Google Chrome est un navigateur web, donc un logiciel. C'est du software."
    },

    {
        question: "Une carte graphique",
        answer: "hardware",
        icon: "🎮",
        explanation:
            "Une carte graphique est un composant électronique installé dans un ordinateur. C'est du hardware."
    },

    {
        question: "Microsoft Word",
        answer: "software",
        icon: "📝",
        explanation:
            "Microsoft Word est un programme permettant de créer et modifier des documents. C'est du software."
    },

    {
        question: "Un clavier",
        answer: "hardware",
        icon: "⌨️",
        explanation:
            "Un clavier est un périphérique physique permettant d'entrer des informations. C'est du hardware."
    },

    {
        question: "Un antivirus",
        answer: "software",
        icon: "🛡️",
        explanation:
            "Un antivirus est un programme qui protège l'ordinateur contre les logiciels malveillants. C'est du software."
    },

    {
        question: "La mémoire RAM",
        answer: "hardware",
        icon: "💾",
        explanation:
            "La RAM est une mémoire physique présente dans l'ordinateur. C'est donc du hardware."
    },

    {
        question: "Spotify",
        answer: "software",
        icon: "🎵",
        explanation:
            "Spotify est une application permettant notamment d'écouter de la musique. C'est du software."
    },

    {
        question: "Un disque SSD",
        answer: "hardware",
        icon: "💽",
        explanation:
            "Un SSD est un périphérique de stockage physique. C'est donc du hardware."
    },

    {
        question: "Minecraft",
        answer: "software",
        icon: "🎮",
        explanation:
            "Minecraft est un jeu vidéo, c'est-à-dire un programme informatique. C'est du software."
    },

    {
        question: "Un écran",
        answer: "hardware",
        icon: "🖥️",
        explanation:
            "Un écran est un périphérique physique qui affiche des informations. C'est du hardware."
    },

    {
        question: "Une application mobile",
        answer: "software",
        icon: "📱",
        explanation:
            "Une application est un programme informatique. Elle appartient donc au software."
    },

    {
        question: "Une webcam",
        answer: "hardware",
        icon: "📷",
        explanation:
            "Une webcam est un appareil physique permettant de capturer des images. C'est du hardware."
    }
];


/* =========================================
   VARIABLES DU JEU
========================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================
   ELEMENTS HTML
========================================= */

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const questionIcon = document.getElementById("question-icon");

const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

const feedback = document.getElementById("feedback");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");

const nextButton = document.getElementById("next-button");

const finalScore = document.getElementById("final-score");
const correctAnswers = document.getElementById("correct-answers");
const wrongAnswers = document.getElementById("wrong-answers");
const percentage = document.getElementById("percentage");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const answerButtons =
    document.querySelectorAll(".answer-button");


/* =========================================
   DEMARRER LE JEU
========================================= */

startButton.addEventListener("click", startGame);

function startGame() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    scoreElement.textContent = score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    gameScreen.classList.add("active");

    loadQuestion();
}


/* =========================================
   CHARGER UNE QUESTION
========================================= */

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;

    questionText.textContent = question.question;

    questionIcon.textContent = question.icon;

    scoreElement.textContent = score;

    /*
        Calcul de la progression.
    */
    const progress =
        (currentQuestion / questions.length) * 100;

    progressBar.style.width = `${progress}%`;


    /*
        Réinitialiser les boutons.
    */
    answerButtons.forEach(button => {

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("wrong");

    });


    /*
        Cacher le feedback.
    */
    feedback.classList.remove("visible");
    feedback.classList.remove("correct");
    feedback.classList.remove("wrong");

    nextButton.classList.remove("visible");
}


/* =========================================
   REPONSE DU JOUEUR
========================================= */

answerButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (answered) {
            return;
        }

        answered = true;

        const selectedAnswer =
            button.dataset.answer;

        checkAnswer(selectedAnswer, button);

    });

});


/* =========================================
   VERIFIER LA REPONSE
========================================= */

function checkAnswer(selectedAnswer, selectedButton) {

    const question = questions[currentQuestion];

    const correctAnswer = question.answer;

    /*
        Désactiver tous les boutons
        après la réponse.
    */
    answerButtons.forEach(button => {
        button.disabled = true;
    });


    /*
        Bonne réponse
    */
    if (selectedAnswer === correctAnswer) {

        score++;

        scoreElement.textContent = score;

        selectedButton.classList.add("correct");

        showFeedback(
            true,
            "Bonne réponse ! 🎉",
            question.explanation
        );

    }

    /*
        Mauvaise réponse
    */
    else {

        selectedButton.classList.add("wrong");

        /*
            Afficher visuellement la bonne réponse.
        */
        answerButtons.forEach(button => {

            if (button.dataset.answer === correctAnswer) {
                button.classList.add("correct");
            }

        });

        showFeedback(
            false,
            "Pas tout à fait !",
            question.explanation
        );

    }


    /*
        Afficher le bouton suivant.
    */
    nextButton.classList.add("visible");


    /*
        Si dernière question.
    */
    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "Voir mon résultat 🏆";

    } else {

        nextButton.textContent =
            "Question suivante →";

    }

}


/* =========================================
   AFFICHER LE FEEDBACK
========================================= */

function showFeedback(isCorrect, title, text) {

    feedback.classList.remove("correct");
    feedback.classList.remove("wrong");

    feedback.classList.add("visible");

    if (isCorrect) {

        feedback.classList.add("correct");

        feedbackIcon.textContent = "✓";

    } else {

        feedback.classList.add("wrong");

        feedbackIcon.textContent = "✕";

    }

    feedbackTitle.textContent = title;

    feedbackText.textContent = text;
}


/* =========================================
   QUESTION SUIVANTE
========================================= */

nextButton.addEventListener("click", () => {

    currentQuestion++;

    /*
        Fin du jeu.
    */
    if (currentQuestion >= questions.length) {

        showResults();

        return;
    }

    loadQuestion();

});


/* =========================================
   AFFICHER LES RESULTATS
========================================= */

function showResults() {

    gameScreen.classList.remove("active");

    resultScreen.classList.add("active");


    /*
        Score final.
    */
    finalScore.textContent = score;


    /*
        Calcul des statistiques.
    */
    const totalQuestions = questions.length;

    const wrong =
        totalQuestions - score;

    const percent =
        Math.round((score / totalQuestions) * 100);


    correctAnswers.textContent = score;

    wrongAnswers.textContent = wrong;

    percentage.textContent =
        `${percent}%`;


    /*
        Message selon le score.
    */

    if (percent === 100) {

        resultTitle.textContent = "Parfait ! 🏆";

        resultMessage.textContent =
            "Tu maîtrises parfaitement la différence entre hardware et software !";

    }

    else if (percent >= 80) {

        resultTitle.textContent = "Excellent ! 🎉";

        resultMessage.textContent =
            "Tu connais très bien les bases de l'informatique.";

    }

    else if (percent >= 60) {

        resultTitle.textContent = "Bien joué ! 👍";

        resultMessage.textContent =
            "Tu as de bonnes bases, mais tu peux encore progresser.";

    }

    else if (percent >= 40) {

        resultTitle.textContent = "Pas mal ! 💪";

        resultMessage.textContent =
            "Encore quelques parties et tu deviendras incollable.";

    }

    else {

        resultTitle.textContent = "Continue à apprendre ! 📚";

        resultMessage.textContent =
            "Pas d'inquiétude : le meilleur moyen d'apprendre est de pratiquer.";

    }

}


/* =========================================
   REJOUER
========================================= */

restartButton.addEventListener("click", () => {

    resultScreen.classList.remove("active");

    gameScreen.classList.add("active");

    currentQuestion = 0;
    score = 0;

    loadQuestion();

});
