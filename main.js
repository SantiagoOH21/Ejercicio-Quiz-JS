const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const finishButton = document.getElementById("finishBtn");
const questionContainerElement = document.getElementById("questionContainer");
const scoreContainerElement = document.getElementById("scoreContainer");
const checkedAnswer = document.getElementById("checkedAnswer");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answerButtons");
let currentQuestionIndex;
let correctAnswers;
let userAnswers;
let userScore;

const questionList = [
  {
    question: "What is 16 / 2 + 2 * 3?",
    answers: [
      { text: "12", correct: false },
      { text: "30", correct: false },
      { text: "14", correct: true },
      { text: "16/12", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "Yes", correct: false },
      { text: "No", correct: false },
    ],
  },
];

function startGame() {
  startButton.classList.add("hide");
  scoreContainerElement.innerHTML = "";
  currentQuestionIndex = 0;
  correctAnswers = [];
  userAnswers = [];
  userScore = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function showQuestion(item) {
  questionElement.innerText = item.question;
  item.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if (answer.correct) {
      button.dataset.correct = true;
      correctAnswers.push(answer.text);

      // hola
      console.log("correctAnswers", correctAnswers);
      //   adios
    }

    button.addEventListener("click", () => {
      userAnswers.push(answer.text);

      // hola
      console.log("userAnswers", userAnswers);
      //   adios

      const isCorrect = button.dataset.correct === "true";
      if (!isCorrect) {
        button.classList.add("color-wrong");
      }

      showCheckedAnswer(isCorrect);
      selectAnswer();
    });

    answerButtonsElement.appendChild(button);
  });
}

function setNextQuestion() {
  resetState();
  showQuestion(questionList[currentQuestionIndex]);
}

function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.add("color-correct");
  } else {
    element.classList.add("color-neutral");
  }
}

function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
    button.disabled = true;
  });
  if (questionList.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    finishButton.classList.remove("hide");
  }
}

function showCheckedAnswer(isCorrect) {
  const answerMessage = document.createElement("h2");
  if (isCorrect) {
    answerMessage.innerText = "Correct!";
  } else {
    answerMessage.innerText = "Incorrect";
  }

  checkedAnswer.appendChild(answerMessage);
}

function resetState() {
  nextButton.classList.add("hide");
  checkedAnswer.innerHTML = "";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function finishGame() {
  for (let i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i] === userAnswers[i]) {
      userScore++;
    }
  }
  // hola
  console.log("userScore", userScore, "/10");
  //   adios

  showScore(userScore);
  finishButton.classList.add("hide");
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
}

function showScore(userScore) {
  const tittleScore = document.createElement("h2");
  tittleScore.innerText = "Your score";
  const getScore = document.createElement("h3");
  getScore.innerText = `${userScore}/10`;
  scoreContainerElement.appendChild(tittleScore);
  scoreContainerElement.appendChild(getScore);
}

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

finishButton.addEventListener("click", () => {
  checkedAnswer.innerHTML = "";
  finishGame();
});
