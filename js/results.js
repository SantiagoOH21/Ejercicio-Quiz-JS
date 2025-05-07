const restartButton = document.getElementById("restartBtn");
const exitButton = document.getElementById("exitBtn");
const rankingButton = document.getElementById("rankingBtn");
const scoreContainerElement = document.getElementById("scoreContainer");
const textContainer = document.getElementById("textContainer");
const resultsContainer = document.getElementById("resultsContainer");

document.addEventListener("DOMContentLoaded", () => {
  checkResults();
});

function checkResults() {
  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
  if (usersLocalStorage.length === 0) {
    return isNoResult();
  } else {
    return showScore(usersLocalStorage[usersLocalStorage.length - 1]);
  }
}

function isNoResult() {
  resultsContainer.classList.add("hide");
  rankingButton.classList.add("hide");
  const noResultsContainer = document.getElementById("noResultsContainer");
  const noticeTitle = document.createElement("h2");
  noticeTitle.innerText = "There are no results to show";
  noResultsContainer.appendChild(noticeTitle);
}

function showScore(user) {
  // Clear previous content
  scoreContainerElement.innerHTML = "";

  // Create a wrapper to center the score and text
  const scoreWrapper = document.createElement("div");
  scoreWrapper.style.display = "flex";
  scoreWrapper.style.flexDirection = "column";
  scoreWrapper.style.alignItems = "center";
  scoreWrapper.style.justifyContent = "center";

  // Create the score circle
  const getScore = document.createElement("div");
  getScore.innerText = `${user.score} / 10`;
  getScore.style.display = "flex";
  getScore.style.alignItems = "center";
  getScore.style.justifyContent = "center";
  getScore.style.width = "12rem";
  getScore.style.height = "12rem";
  getScore.style.borderRadius = "50%";
  getScore.style.fontSize = "3rem";
  getScore.style.fontWeight = "bold";
  getScore.style.marginBottom = "1.2rem";
  getScore.style.backgroundColor = user.score <= 4 ? "#ff7a7a" : "#7fffd4";
  getScore.style.color = "#111";

  // Title below the circle
  const titleScore = document.createElement("h2");
  titleScore.innerText = "Your score";
  titleScore.style.margin = "1rem 0 0.5rem 0";

  scoreWrapper.appendChild(getScore);
  scoreWrapper.appendChild(titleScore);
  scoreContainerElement.appendChild(scoreWrapper);

  const scoreMessage = showText(user.score);
  createMessage(scoreMessage);
}

function showText(score) {
  const scoreNumber = parseInt(score, 10);
  let scoreMessage;
  switch (scoreNumber) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      scoreMessage =
        "You failed 😪... But don't worry, you can try the quiz again!";
      break;

    case 5:
    case 6:
      scoreMessage = "You passed the quiz, but you can improve.😉";
      break;

    case 7:
    case 8:
      scoreMessage = "Well done!!🎉 Quizzes are your thing!";
      break;

    case 9:
      scoreMessage = "Outstanding!! You're brilliant 🤓!!";
      break;
    case 10:
      scoreMessage = "You're the king 👑 of the quiz!! CONGRATULATIONS!!🍾🍾";
      break;
  }
  return scoreMessage;
}

function createMessage(scoreMessage) {
  const pMessage = document.createElement("p");
  pMessage.innerText = scoreMessage;
  textContainer.appendChild(pMessage);
}

function restartGame() {
  const linkQuestion = document.getElementById("linkQuestion");
  if (linkQuestion) {
    setTimeout(() => {
      window.location.href = linkQuestion.href;
    }, 1000);
  }
}

function goHome() {
  const linkQuestion = document.getElementById("linkHome");
  if (linkHome) {
    setTimeout(() => {
      window.location.href = linkHome.href;
    }, 1000);
  }
}

//Buttons addEventListener
restartButton.addEventListener("click", () => {
  restartGame();
});

exitButton.addEventListener("click", () => {
  goHome();
});

// Extra exercise: ranking of the best players.
//show only the top-ten players

virtualUsers = [
  { name: "Annie", score: 1, date: "1/5/2025" },
  { name: "Susan", score: 0, date: "1/5/2025" },
  { name: "Luke", score: 1, date: "1/5/2025" },
  { name: "Eleanor", score: 0, date: "1/5/2025" },
  { name: "Caleb", score: 1, date: "1/5/2025" },
  { name: "Hazel", score: 0, date: "1/5/2025" },
  { name: "Finn", score: 1, date: "1/5/2025" },
  { name: "Scarlett", score: 0, date: "1/5/2025" },
  { name: "Sarah", score: 1, date: "1/5/2025" },
  { name: "Owen", score: 0, date: "1/5/2025" },
];

function printRanking() {
  const rankingContainer = document.getElementById("rankingContainer");
  rankingContainer.classList.remove("hide");
  resultsContainer.classList.add("hide");
  rankingButton.classList.add("hide");

  const usersRanking =
    JSON.parse(localStorage.getItem("usersRanking")) || virtualUsers;

  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) ||
    virtualUsers[virtualUsers.length - 1];
  const lastUser = usersLocalStorage[usersLocalStorage.length - 1];
  const lastUserScore = lastUser.score;

  if (lastUserScore == 10) {
    usersRanking[0] = lastUser;
  } else if (lastUserScore > usersRanking[usersRanking.length - 1].score) {
    usersRanking[usersRanking.length - 1] = lastUser;
  }

  usersRanking.sort((a, b) => {
    const scoreA = parseInt(a.score, 10);
    const scoreB = parseInt(b.score, 10);

    if (scoreA > scoreB) {
      return -1;
    }
    if (scoreA < scoreB) {
      return 1;
    }
    return 0;
  });

  usersRanking.forEach((user) => {
    const tableBody = document.getElementById("tableBody");
    const tableRow = document.createElement("tr");
    for (const key in user) {
      const tableCell = document.createElement("td");
      tableCell.textContent = user[key];
      tableRow.appendChild(tableCell);
    }

    tableBody.appendChild(tableRow);
  });

  localStorage.setItem("usersRanking", JSON.stringify(usersRanking));
}

rankingButton.addEventListener("click", () => {
  printRanking();
});

// End of the extra exercise code
