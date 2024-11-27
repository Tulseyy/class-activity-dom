// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleTheme = document.getElementById("toggleTheme");
const filterAll = document.getElementById("filterAll");
const filterCompleted = document.getElementById("filterCompleted");
const filterPending = document.getElementById("filterPending");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            ${task.text}
            <div>
                <button onclick="toggleTask(${index})"><i class="fas fa-check"></i></button>
                <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
});

// Mark a task as completed or pending
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Filter tasks
filterAll.addEventListener("click", () => renderTasks("all"));
filterCompleted.addEventListener("click", () => renderTasks("completed"));
filterPending.addEventListener("click", () => renderTasks("pending"));

// Dark/Light Mode Toggle
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initial render
renderTasks();
