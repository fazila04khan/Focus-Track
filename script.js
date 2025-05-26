let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText) {
    tasks.push(taskText);
    input.classList.remove("error");
    renderTaskList();
    input.value = "";
  } else {
    input.classList.add("error");
    alert("Please enter a task!");
  }
}

function renderTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button onclick="removeTask(${index})" aria-label="Remove task">✖</button>
    `;
    list.appendChild(li);
  });
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTaskList();
}

// Timer Logic
let timer;
let timeRemaining = 50 * 60;
let isPaused = false;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  isPaused = false;
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
}

function updateTimer() {
  if (!isPaused && timeRemaining > 0) {
    timeRemaining--;
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
    const seconds = String(timeRemaining % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  }

  if (timeRemaining <= 0) {
    clearInterval(timer);
    alert("Time's up!");
    timeRemaining = 50 * 60;
    document.getElementById("timer").textContent = "25:00";
  }
}

// Date & Time Display
function updateDateTime() {
  const now = new Date();

  const dateOnly = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dayOnly = now.toLocaleDateString(undefined, {
    weekday: 'long'
  });

  const timeOnly = now.toLocaleTimeString();

  document.getElementById("dateText").textContent = dateOnly;
  document.getElementById("dayText").textContent = dayOnly;
  document.getElementById("currentTime").textContent = timeOnly;
}

setInterval(updateDateTime, 1000);

// Set footer year dynamically
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("footerYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Light and Dark Mode Functions
function setDarkMode() {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
}

function setLightMode() {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
}
