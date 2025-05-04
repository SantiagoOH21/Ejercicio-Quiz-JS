document.addEventListener("DOMContentLoaded", () => {
  checkResults();
});
function checkResults() {
  const usersLocalStorage =
    JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
  if (usersLocalStorage.length === 0) {
    return isNoResult();
  } else {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.classList.remove("hide");
    return usersLocalStorage.forEach((user) => printResults(user));
  }
}

function isNoResult() {
  const noResultsContainer = document.getElementById("noResultsContainer");
  const div = document.createElement("div");
  const noticeTitle = document.createElement("h2");
  noticeTitle.innerText = "There are no results to show";
  div.appendChild(noticeTitle);
  noResultsContainer.appendChild(div);
}

function printResults(user) {
  const tableBody = document.getElementById("tableBody");
  const tableRow = document.createElement("tr");
  for (const key in user) {
    const tableCell = document.createElement("td");
    tableCell.textContent = user[key];
    tableRow.appendChild(tableCell);
  }

  tableBody.appendChild(tableRow);
}
