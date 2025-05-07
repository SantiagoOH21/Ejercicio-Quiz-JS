const ctx = document.getElementById("myChart");

// Datos para el gráfico

const labels = ["0-4", "5-6", "7-8", "8-9", "10"];

const data = {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Results of your quizzes",
        data:
          // traer los datos del LocalStorage
          [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart = new Chart(ctx, data);

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
