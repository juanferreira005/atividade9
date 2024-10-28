let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.name} - ${task.dueDate} - ${task.priority}
            <button onclick="editTask(${index})">Editar</button>
            <button onclick="deleteTask(${index})">Deletar</button>
        `;
        taskList.appendChild(li);
    });
    checkDueDates();
}

function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;
    deleteTask(index);
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = {
        name: document.getElementById('taskName').value,
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementById('taskPriority').value,
    };
    addTask(newTask);
    taskForm.reset();
});

function checkDueDates() {
    const now = new Date();
    tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        if (dueDate - now <= 3 * 24 * 60 * 60 * 1000 && dueDate >= now) { // Próximo de 3 dias
            alert(`Atenção: A tarefa "${task.name}" está próxima do prazo de conclusão!`);
        }
    });
}

document.getElementById('filterStatus').addEventListener('click', () => {
    // Implementar filtragem por status
});

document.getElementById('filterPriority').addEventListener('click', () => {
    // Implementar filtragem por prioridade
});

// Exibir tarefas ao carregar a página
displayTasks();
