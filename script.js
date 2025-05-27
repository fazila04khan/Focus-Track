// Task Management
let tasks = [];

// Add task function
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

// Render task list
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

// Remove task function
function removeTask(index) {
  tasks.splice(index, 1);
  renderTaskList();
}

// Timer Management
let timer;
let timeRemaining = 50 * 60; // 50 minutes in seconds
let isPaused = false;
let isRunning = false;

// Start timer function
function startTimer() {
  if (!isRunning) {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    isPaused = false;
    isRunning = true;
  }
}

// Pause timer function
function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
  isRunning = false;
}

// Reset timer function
function resetTimer() {
  clearInterval(timer);
  timeRemaining = 50 * 60;
  isPaused = false;
  isRunning = false;
  document.getElementById("timer").textContent = "50:00";
}

// Update timer display
function updateTimer() {
  if (!isPaused && timeRemaining > 0) {
    timeRemaining--;
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
    const seconds = String(timeRemaining % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  }

  if (timeRemaining <= 0) {
    clearInterval(timer);
    alert("Time's up! Great focus session!");
    resetTimer();
  }
}

// Date & Time Management
function updateDateTime() {
  const now = new Date();

  // Format date
  const dateOnly = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format day
  const dayOnly = now.toLocaleDateString(undefined, {
    weekday: 'long'
  });

  // Format time
  const timeOnly = now.toLocaleTimeString();

  // Update DOM elements
  document.getElementById("dateText").textContent = dateOnly;
  document.getElementById("dayText").textContent = dayOnly;
  document.getElementById("currentTime").textContent = timeOnly;
}

// Update date/time every second
setInterval(updateDateTime, 1000);

// Theme Management
function setDarkMode() {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
  localStorage.setItem("theme", "dark");
}

function setLightMode() {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setDarkMode();
  } else if (savedTheme === "light") {
    setLightMode();
  }
}

// DOM Content Loaded Event Handlers
document.addEventListener("DOMContentLoaded", () => {
  // Initialize date/time
  updateDateTime();
  
  // Set footer year
  const yearSpan = document.getElementById("footerYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Load saved theme
  loadTheme();
  
  // Add Enter key support for task input
  const taskInput = document.getElementById("taskInput");
  if (taskInput) {
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask();
      }
    });
  }
  
  // Load saved tasks if any (optional feature)
  loadTasks();
});

// Optional: Save/Load tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTaskList();
  }
}

// Update task functions to save automatically
const originalAddTask = addTask;
addTask = function() {
  originalAddTask();
  saveTasks();
};

const originalRemoveTask = removeTask;
removeTask = function(index) {
  originalRemoveTask(index);
  saveTasks();
};

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Space to start/pause timer (when not typing in input)
  if (e.code === "Space" && e.target.tagName !== "INPUT") {
    e.preventDefault();
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }
  
  // R to reset timer
  if (e.key === "r" || e.key === "R") {
    if (e.target.tagName !== "INPUT") {
      resetTimer();
    }
  }
});

// Prevent form submission on Enter (if form is added later)
document.addEventListener("submit", (e) => {
  e.preventDefault();
});
