
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            addTaskToList(taskText);
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            const taskSpan = listItem.querySelector('.task-text');
            tasks.push(taskSpan.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToList(taskText) {
        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        taskSpan.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
        });

        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.classList.add('show-more-button');
        showMoreButton.addEventListener('click', function() {
            if (listItem.classList.contains('expanded')) {
                listItem.classList.remove('expanded');
                showMoreButton.textContent = 'Show More';
            } else {
                listItem.classList.add('expanded');
                showMoreButton.textContent = 'Show Less';
            }
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task:', taskSpan.textContent);
            if (newTaskText !== null) {
                taskSpan.textContent = newTaskText;
                saveTasks();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasks();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(showMoreButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        if (taskText === '') return;

        addTaskToList(taskText);
        saveTasks();

        taskInput.value = '';
    });

    loadTasks();
});
