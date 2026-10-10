
const tasks = [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
        <li>
            <input
                type="checkbox"
                data-action="complete"
                data-index="${index}"
                ${task.completed ? "checked" : ""}
                aria-label="Mark ${task.text} as complete"
            >

            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <button
                type="button"
                class="delete-btn"
                data-action="delete"
                data-index="${index}"
            >
                Delete
            </button>
        </li>
    `).join("");

    emptyMessage.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
    taskInput.focus();
});

taskList.addEventListener("change", function(event) {
    if (event.target.dataset.action === "complete") {
        const index = Number(event.target.dataset.index);
        tasks[index].completed = event.target.checked;
        renderTasks();
    }
});

taskList.addEventListener("click", function(event) {
    const button = event.target.closest('[data-action="delete"]');

    if (!button) return;

    const index = Number(button.dataset.index);
    tasks.splice(index, 1);
    renderTasks();
});

renderTasks();
