const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
const counter = document.querySelector('.counter');
const clearAllButton = document.querySelector('.clear-all');
const todoStored = localStorage.getItem('todos')
let todos = getTodosFromLocalStorage();
let valueBeforeEditIndex;

if (todos) {
  insertMultipleToListOnDom(todos);
  counterUpdate();
} else {
  counterUpdate();
}

/* Event listeners*/

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo(todoInput.value);
})

clearAllButton.addEventListener('click', () => {
  clearAll();
})

/* Functions*/

function addTodo(todo) {
  if (!todo) {
    alert('Please fill out the box');
    return;
  }
  todos.push(todo);
  saveTodosToLocalStorage(todos);
  counterUpdate();
  insertToListOnDom(todo);
}

function saveTodosToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function insertToListOnDom(todo) {
  const todo_li = document.createElement('li');
  todo_li.classList.add('item');
  todoItemsList.appendChild(todo_li);
  const todo_input_li = document.createElement('input');
  todo_input_li.classList.add('text');
  todo_input_li.type = 'text';
  todo_input_li.value = todo;
  todo_input_li.setAttribute('disabled', '');

  const todo_edit_li = document.createElement('button');
  todo_edit_li.classList.add('edit');
  todo_edit_li.innerHTML = 'Edit';

  todo_edit_li.addEventListener('click', () => {
    editTodoInput(todo_edit_li, todo_input_li);
  });

  const todo_delete_li = document.createElement('button');
  todo_delete_li.classList.add('delete');
  todo_delete_li.innerHTML = 'Delete';

  todo_delete_li.addEventListener('click', () => {
    deleteTodoInput(todo_input_li,todo_li);
  })

  todo_li.appendChild(todo_input_li);
  todo_li.appendChild(todo_edit_li);
  todo_li.appendChild(todo_delete_li);
  todoInput.value = '';
}

function getTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    return [];
  }
}

function insertMultipleToListOnDom(todos) {
  todos.forEach(todo => {
    insertToListOnDom(todo);
  })
}

function editTodoInput(todoEdit, todoInput) {
  if (todoEdit.innerText.toLowerCase() === 'edit') {
    const oldInputValue = todoInput.value;
    valueBeforeEditIndex = todos.indexOf(oldInputValue);
    todoInput.removeAttribute('disabled');
    todoInput.focus();
    todoEdit.innerText = 'Save';
  } else {
    todoInput.setAttribute('disabled', '');
    todoEdit.innerText = 'Edit';
    todos.splice(valueBeforeEditIndex,1,todoInput.value);
    saveTodosToLocalStorage(todos);
    counterUpdate();
  }
}

function deleteTodoInput(todoDelete,todoElement) {
  const todoIndex = todos.indexOf(todoDelete.value)
  todos.splice(todoIndex,1);
  todoItemsList.removeChild(todoElement);
  saveTodosToLocalStorage(todos);
  counterUpdate();
}

function counterUpdate() {
  const counterNumber = todos.length;
  counter.innerHTML = `Number of To dos: ${counterNumber}`;
}

function clearAll() {
  todoItemsList.innerHTML="";
  todos=[];
  saveTodosToLocalStorage(todos);
  counterUpdate();
}ss