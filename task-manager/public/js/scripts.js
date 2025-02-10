//Información inicial
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName) {
        fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: taskName })
        })
        .then(response => response.json())
        .then(task => {
            loadTasks();
            taskInput.value = "";
        });
    }
});

// Función para agregar tarea a la Base de Datos
function addTaskToList(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task.name;

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.onclick = () => editTask(task.id, taskName);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

//Cargar las tareas
function loadTasks() {
    fetch("/tasks")
        .then(response => response.json())
        .then(tasks => {
            renderTable(tasks);
        });
}

//Función que permite editar una tarea
function editTask(taskId, taskName) {
    const newTaskName = prompt("Edite la tarea:", taskName);
    if (newTaskName) {
        fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newTaskName })
        })
        .then(response => response.json())
        .then(() => loadTasks());
    }
}

//Función que permite eliminar una tarea
function deleteTask(taskId) {
    //Preguntar antes de eliminar la tarea
    if(confirm("Confirme Eliminación de esta Tarea?")){
        fetch(`/tasks/${taskId}`, {
            method: "DELETE"
        })
        .then(() => loadTasks());
    }
}

//Función que permite completar tarea
function completeTask(taskId) {
    if (taskId) {
        fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: '', completed: true })
        })
        .then(response => response.json())
        .then(() => loadTasks());
    }
}

loadTasks();

// Function Para crear la tabla SQL
function generateTable(tasks) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create columnas de tabla
    const headers = ['ID', 'Nombre', 'Completado', 'Operaciones'];
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    // Agregar datos a la tabla
    tasks.forEach(task => {
        const tr = document.createElement('tr');
        const completado = task.completed? "Si":"No";
        tr.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${completado}</td>
            <td>
                <button class="btn-edit" onclick="editTask(${task.id},'${task.name}')">Editar</button>
                <button class="btn-complete" onclick="completeTask(${task.id})">Completar</button>
                <button class="btn-del" onclick="deleteTask(${task.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

// Renderiza el contenido de la tabla
function renderTable(tasks) {
    const tableContainer = document.getElementById('tableContainer');
    //Se limpia la tabla
    tableContainer.innerHTML = ''; 
    const table = generateTable(tasks);
    tableContainer.appendChild(table);
}
