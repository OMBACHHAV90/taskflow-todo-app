let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!text.trim()) return alert("Enter a task!");

    tasks.push({
        id: Date.now(),
        text,
        priority,
        dueDate,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "completed")
        filtered = tasks.filter(t => t.completed);
    if (currentFilter === "pending")
        filtered = tasks.filter(t => !t.completed);

    filtered.sort((a,b) => a.priority - b.priority);

    filtered.forEach(task => {
        const card = document.createElement("div");
        card.className = "task-card";

        if (task.completed) card.classList.add("completed");

        let badgeClass =
            task.priority == 1 ? "high" :
            task.priority == 2 ? "medium" : "low";

        card.innerHTML = `
            <div class="task-info">
                <strong onclick="toggleTask(${task.id})">${task.text}</strong>
                <small>Due: ${task.dueDate || "No date"}</small>
                <span class="badge ${badgeClass}">
                    ${badgeClass.toUpperCase()}
                </span>
            </div>
            <div class="actions">
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

renderTasks();