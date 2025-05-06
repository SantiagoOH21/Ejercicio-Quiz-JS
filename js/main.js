const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const finishButton = document.getElementById("finishBtn");
const welcomeQuiz = document.getElementById("welcomeQuiz");
const tittleQuestion = document.getElementById("tittleQuestion");
const questionContainerElement = document.getElementById("questionContainer");
const checkedAnswer = document.getElementById("checkedAnswer");
const questionElement = document.getElementById("questionText");
const answerButtonsElement = document.getElementById("answerButtons");
const userForm = document.querySelector("#userForm");
const inputName = document.getElementById("userName");
let currentQuestionIndex;
let userScore;

function exchangeAnswer(objAnswer) {
  randomIndex = Math.floor(Math.random() * 4);
  if (randomIndex !== 3) {
    return ([objAnswer[3], objAnswer[randomIndex]] = [
      objAnswer[randomIndex],
      objAnswer[3],
    ]);
  }
}

function createAnswers(incorrectAnswers, correctAnswer) {
  const answers = [];
  incorrectAnswers.forEach((incorrect) => {
    const incorrectAnswer = { text: `${incorrect}`, correct: false };
    answers.push(incorrectAnswer);
  });
  const correctOption = { text: `${correctAnswer}`, correct: true };
  answers.push(correctOption);
  exchangeAnswer(answers);
  return answers;
}

function createQuestions(resultsAPI) {
  const questionList = [];
  resultsAPI.forEach((result) => {
    const question = result.question;
    const incorrectAnswers = result.incorrect_answers;
    const correctAnswer = result.correct_answer;
    const answers = createAnswers(incorrectAnswers, correctAnswer);
    questionList.push({ question, answers });
  });
  return questionList;
}

//API called
async function getAPIQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
    const res = await response.json();
    const resultsAPI = res.results;
    questionList = createQuestions(resultsAPI);
    return questionList;
  } catch (error) {
    console.error("Error getting questions from the API", error);
    return [];
  }
}

async function initializeQuiz() {
  questionList = await getAPIQuestions();
}
initializeQuiz();

//Game's functions

function startGame() {
  startButton.classList.add("hide");
  welcomeQuiz.classList.add("hide");
  userForm.classList.add("hide");
  currentQuestionIndex = 0;
  userScore = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function showQuestion(item) {
  questionElement.innerText = item.question;
  let bgcClass = 0;
  item.answers.forEach((answer) => {
    bgcClass++;
    const button = document.createElement("button");
    button.classList.add(`color-button${bgcClass}`);
    button.innerText = answer.text;

    if (answer.correct) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", () => {
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
  questionNumber = currentQuestionIndex + 1;
  tittleQuestion.innerText = `QUESTION ${questionNumber}`;
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
    button.classList.add("disableButton"); // Clase, para poner la letra de color negro
  });
  if (questionList.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    finishButton.classList.remove("hide");
  }
}

function showCheckedAnswer(isCorrect) {
  const answerMessage = document.createElement("h3");
  if (isCorrect) {
    answerMessage.innerText = "Correct! \u{1F389}";
    userScore++;
  } else {
    answerMessage.innerText = "Incorrect \u{1F61F}";
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

//LocalStorage
function addUser() {
  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
  const userName = inputName.value.trim();
  const dateGame = new Date().toLocaleDateString();
  const newUser = {
    name: userName,
    score: userScore,
    date: dateGame,
  };
  usersLocalStorage.push(newUser);
  localStorage.setItem("usersLocalStorage", JSON.stringify(usersLocalStorage));
}

//goResults function
function goResults() {
  const linkResults = document.getElementById("linkResults");
  if (linkResults) {
    setTimeout(() => {
      window.location.href = linkResults.href;
    }, 1000);
  }
}

//Buttons addEventListener
startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

finishButton.addEventListener("click", () => {
  addUser();
  goResults();
});
