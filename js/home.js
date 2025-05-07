const startButton = document.getElementById("startBtn");
const homeMessage = document.getElementById("homeMessage");
const ctx = document.getElementById("myChart");

function checkData() {
  const dataChart = JSON.parse(localStorage.getItem("usersLocalStorage")) || [];

  if (dataChart.length === 0) {
    return isNoData();
  } else {
    return printChart(dataChart);
  }
}

function isNoData() {
  const noticeTitle = document.createElement("h2");
  noticeTitle.innerText = "There are no results to show";
  homeMessage.appendChild(noticeTitle);
}

function printChart(chartData) {
  dates = chartData.map((item) => item.date);
  scores = chartData.map((item) => item.score);

  const data = {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Results of your quizzes",
          data: scores,
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Results of your quizzes",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: {
            display: true,
            text: "Score",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, data);
}

checkData();

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
