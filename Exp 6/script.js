// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.onload = loadTasks;

// Add task button
addBtn.addEventListener("click", addTask);

// Enter key also adds task
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = "";
}

// Create task list item
function createTaskElement(text, completed = false) {
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = text;
    if (completed) span.classList.add("completed");
    li.appendChild(span);

    // Action buttons container
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action-btns");

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => toggleComplete(span, text);
    actionDiv.appendChild(completeBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(li, text);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(actionDiv);

    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle task completion
function toggleComplete(span, text) {
    span.classList.toggle("completed");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === text) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(li, text) {
    li.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on refresh
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}
