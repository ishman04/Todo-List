function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    appendTodoInHTML(todoText);
}

let num = 0;

function appendTodoInHTML(todoText) {
    const todoList = document.getElementById("tasklist");
    const todoItem = document.createElement("li");
    num++; // Increment num for unique IDs

    todoItem.setAttribute('id', `id${num}`);

    const todoTextSpan = document.createElement("span");
    todoTextSpan.textContent = todoText;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute('id', `del${num}`);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTodoItem(todoItem);
    });
    const st=todoItem.style;
    st.display="flex";
    st.justifyContent="space-between";
    const buttonStyle=deleteButton.style;
    buttonStyle.marginLeft="10px";
    buttonStyle.padding="5px";
    buttonStyle.borderRadius="3px"
    buttonStyle.border="none";
    buttonStyle.backgroundColor="gray"
    todoItem.appendChild(todoTextSpan);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}

function deleteTodoItem(todoItem) {
    const todoList = document.getElementById("tasklist");
    const itemId = todoItem.getAttribute('id');
    const num = itemId.substring(2); // Extract the number from 'id[num]'
    todoList.removeChild(todoItem);

    // Remove from localStorage
    let todos = loadTodos();
    todos.todoList.splice(num - 1, 1); // Adjust index for zero-based array
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoinput");
    const todoList = document.getElementById("tasklist");
    const submitButton = document.getElementById("addtodo");

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });

    submitButton.addEventListener("click", () => {
        const todoText = todoInput.value;
        if (todoText.trim() === '') {
            alert("Please write something");
        } else {
            addTodoToLocalStorage(todoText);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change", (event) => {
        // Fired whenever there is a change in the input tag
        const todoText = event.target.value.trim();
        event.target.value = todoText; // Trims irrelevant spaces after full text
        console.log(todoText);
    });

    // Load existing todos from localStorage
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        appendTodoInHTML(todo);
    });
});

