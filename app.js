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

}


function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo girin..")
    } else {
        addTodoToUI(newTodo);
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

function showAlert(alertType, message) {
    /*  <div class="alert alert-warning" role="alert">
                   
                 </div>
                  */
    const alertElement = document.createElement("div")
    alertElement.setAttribute("role", "alert")
    alertElement.className = `alert alert-${alertType}`
    alertElement.textContent = `${message}`
    firstCardBody.appendChild(alertElement)

    setTimeout(() => {
        alertElement.remove()
    }, 1000);
}