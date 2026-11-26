
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("timewiseTasks")) || [];

function saveTasks() {
  localStorage.setItem("timewiseTasks", JSON.stringify(tasks));
}

function addTask() {
  const name = taskInput.value.trim();
  const time = taskTime.value;

  if (!name || !time) {
    alert("Silakan isi nama kegiatan dan waktunya!");
    return;
  }

  tasks.push({
    id: Date.now(),
    name: name,
    time: time,
    done: false
  });

  taskInput.value = "";
  taskTime.value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? {...task, done: !task.done}
      : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.sort((a, b) => a.time.localeCompare(b.time));

  tasks.forEach(task => {
    const li = document.createElement("li");

    const info = document.createElement("label");
    info.className = "task-info" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.style.width = "auto";
    checkbox.style.margin = "0";
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const name = document.createElement("span");
    name.textContent = `${task.time} - ${task.name}`;

    info.append(checkbox, name);

    const remove = document.createElement("button");
    remove.className = "delete-btn";
    remove.textContent = "Hapus";
    remove.addEventListener("click", () => deleteTask(task.id));

    li.append(info, remove);
    taskList.appendChild(li);
  });

  const completed = tasks.filter(task => task.done).length;
  const percentage = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  document.getElementById("progressText").textContent =
    percentage + "%";

  document.getElementById("progressBar").style.width =
    percentage + "%";
}

renderTasks();
