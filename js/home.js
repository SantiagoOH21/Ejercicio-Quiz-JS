const homeMessage = document.getElementById("homeMessage");
const ctx = document.getElementById("myChart");

// Use the checkResults function to get data
function checkResults() {
  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
  if (usersLocalStorage.length === 0) {
    return isNoResult();
  } else {
    return showScore(usersLocalStorage[usersLocalStorage.length - 1]);
  }
}

// Function to handle no results
function isNoResult() {
  console.log("No results found");
  return [];
}

// Function to display score and prepare chart data
function showScore(latestUser) {
  // Get all users for chart data
  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) || [];

  // Sort users by date
  usersLocalStorage.sort((a, b) => new Date(a.date) - new Date(b.date));

  return usersLocalStorage;
}

// Get the user data using the provided functions
const userData = checkResults();

// Extract dates and scores for the chart
const dates = userData.map((item) => item.date);
const scores = userData.map((item) => item.score);

// Create chart
const data = {
  labels: dates,
  datasets: [
    {
      label: "Your stats",
      data: scores,
      borderColor: "rgb(0, 123, 255)",
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 3,
    },
  ],
};

// Chart configuration
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Your stats",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  },
};

// Set chart size to be smaller
ctx.style.maxHeight = "250px";
ctx.style.maxWidth = "500px";

// Initialize the chart
const myChart = new Chart(ctx, config);

// Date display below chart
function displayQuizDates() {
  if (!userData || userData.length === 0) {
    return;
  }

  const dateListContainer = document.createElement("div");
  dateListContainer.style.marginTop = "10px";
  dateListContainer.style.fontSize = "10px";
  dateListContainer.style.fontWeight = "bold";
  dateListContainer.style.display = "grid";
  dateListContainer.style.gridTemplateColumns =
    "repeat(auto-fit, minmax(150px, 1fr))";
  dateListContainer.style.gap = "2px";

  userData.forEach((item) => {
    const dateEntry = document.createElement("div");
    dateEntry.textContent = `${item.date}: ${item.score} aciertos`;
    dateEntry.style.padding = "5px";
    dateEntry.style.marginBottom = "1px";
    dateListContainer.appendChild(dateEntry);
  });

  // Insert after the canvas
  ctx.parentNode.insertBefore(dateListContainer, ctx.nextSibling);
}

// Call function to display dates
displayQuizDates();

// Link to quiz
const startButton = document.getElementById("startBtn");

function goQuiz() {
  const linkQuestion = document.getElementById("linkQuiz");
  if (linkQuiz) {
    setTimeout(() => {
      window.location.href = linkQuiz.href;
    }, 1000);
  }
}

//Buttons addEventListener
startButton.addEventListener("click", () => {
  goQuiz();
});
