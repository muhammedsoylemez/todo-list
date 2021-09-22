const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);

    // Getting all todos from storage when page loaded.
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    // Deleting todos 
    secondCardBody.addEventListener("click",deleteTodo)
    // Filter 
    filter.addEventListener("keyup",filterTodos)

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")
    listItems.forEach((listItem)=>{
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            // Bulamadı
            listItem.setAttribute("style","display:none !important")
        }else{
            listItem.setAttribute("style","display:block")
        }
    })
}

function deleteTodoFromStorage(deletedTodo) {
    let todos = getTodosFromStorage();
    todos.forEach((todo,index) => {
        if (todo === deletedTodo) {
            todos.splice(index,1); // Deleting todo from array
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        let pickedTodo = e.target.parentElement.parentElement;
        pickedTodo.remove();
        deleteTodoFromStorage(pickedTodo.textContent)
        showAlert("success","Todo Başarıyla silindi")
    }
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach((todo) => {
        addTodoToUI(todo)
    });

}


function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo girin..")
    } else {
        addTodoToUI(newTodo);
        // Adding todos to the storage
        addTodoToStorage(newTodo)

        showAlert("success", "Başarıyla eklendi.")

    }


    e.preventDefault();

}

// Adding string value to the UI as a list item.
function addTodoToUI(newTodo) {
    // creating a list item.
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between"

    // creating a link
    const link = document.createElement("a");
    link.href = "#"
    link.className = "delete-item";
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // Adding string value as a text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link)

    // Adding list item to the Todo List
    todoList.appendChild(listItem)
    todoInput.value = "";


}

// Getting todos from storage.
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(alertType, message) {

    const alertElement = document.createElement("div")
    alertElement.setAttribute("role", "alert")
    alertElement.className = `alert alert-${alertType}`
    alertElement.textContent = `${message}`
    firstCardBody.appendChild(alertElement)

    setTimeout(() => {
        alertElement.remove()
    }, 1000);
}