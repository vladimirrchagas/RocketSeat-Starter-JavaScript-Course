var listElement = document .querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todo = JSON.parse(localStorage.getItem('list_todo'))||['Fazer café', 'Estudar Javascript', 'Acessar comunidade RocketSeat'];

function renderTodos(){
    listElement.innerHTML = '';
    
    for (todos of todo){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todos);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);

        var pos = todo.indexOf(todos);
        linkElement.setAttribute('onclick', 'delTodo(' + pos + ')');

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    var todoText = inputElement.value;

    todo.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}

function delTodo(pos){
    todo.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

function saveToStorage(){
    localStorage.setItem('list_todo',JSON.stringify(todo));
}