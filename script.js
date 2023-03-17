const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const addTrashButton = document.querySelector('.trash');
let todo = document.querySelector('.todo');
let todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function () {
  const taskText = addMessage.value;
  console.log(taskText);
  let newToDo = {
    todo: addMessage.value,
    checked: false,
    importand: false,
  };

  todoList.push(newToDo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
});

addTrashButton.addEventListener('click', function (event) {
  let valueLabelbtn = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
  todoList.forEach(function (item, i) {
    if (item.todo === valueLabelbtn) {
      todoList.splice(item, 1);
    }
  });
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
  let displayMessage = '';
  todoList.forEach(function (item, i) {
    displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}'>${item.todo}</label>
        <div class="icons">
        <div class="star" id='item_${i}' >
        <ion-icon name="star-outline"></ion-icon>
        </div>
        <div class="trash" id='item_${i}'>
        <ion-icon name="trash-outline"></ion-icon>
        </div>
        </div>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function (event) {
  let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});
