// Клас для генерації запитань
class Question {
    constructor(questionText, options, correctAnswer) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    display() {
        document.getElementById("question").innerHTML = this.questionText;
        let answersHtml = '';
        this.options.forEach((answer, index) => {
            answersHtml += `<div class="answer" data-answer="${answer}">${answer}</div>`;
        });
        document.getElementById("answers").innerHTML = answersHtml;
    }
}

// Запитання для вікторини
const questions = [
    new Question(
        "Який океан є найбільший у світі?",
        ["Атлантичний океан", "Індійський океан", "Тихий океан", "Південний океан", "Північний Льодовитий океан"],
        "Тихий океан"
    ),
    new Question(
        "Яка середня глибина Тихого океану?",
        ["4000 м", "6000 м", "8000 м", "10000 м", "12000 м"],
        "4000 м"
    ),
    new Question(
        "Який океан наймолодший?",
        ["Тихий океан", "Атлантичний океан", "Індійський океан", "Південний океан", "Північний Льодовитий океан"],
        "Південний океан"
    ),
    new Question(
        "Яка кількість океанів на Землі?",
        ["3", "4", "5", "6", "7"],
        "5"
    ),
    new Question(
        "Який океан є найглибшим?",
        ["Атлантичний океан", "Індійський океан", "Тихий океан", "Південний океан", "Північний Льодовитий океан"],
        "Тихий океан"
    )
];

// Логіка вікторини
const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const startContainer = document.querySelector(".start-container");
const statsElement = document.getElementById("stats");

let currentQuestion;
let questionCounter = 0;
let correctAnswers = 0;

function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (questionCounter < questions.length) {
        currentQuestion = questions[questionCounter];
        currentQuestion.display();
        questionCounter++;
    } else {
        showStats();
    }
}

function checkAnswer(event) {
    const selectedAnswer = event.target.dataset.answer;
    const answerElements = document.querySelectorAll(".answer");

    // Видаляємо попереднє підсвічування
    answerElements.forEach(answer => {
        answer.classList.remove("correct-answer", "incorrect-answer");
    });

    // Перевірка правильності
    if (selectedAnswer === currentQuestion.correctAnswer) {
        console.log("Правильно");
        event.target.classList.add("correct-answer"); // Додаємо клас для правильної відповіді
        correctAnswers++;
    } else {
        console.log("Неправильно");
        event.target.classList.add("incorrect-answer"); // Додаємо клас для неправильної відповіді
    }

    // Завантажуємо наступне питання через 1.5 секунди
    setTimeout(loadQuestion, 1500);
}

function showStats() {
    const accuracy = Math.round((correctAnswers / questions.length) * 100);
    statsElement.innerHTML = `Ви дали ${correctAnswers} правильних відповідей із ${questions.length}. Точність - ${accuracy}%`;
    startContainer.style.display = "block";
    quizContainer.style.display = "none";
}

startButton.addEventListener("click", startQuiz);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("answer")) {
        checkAnswer(event);
    }
});
