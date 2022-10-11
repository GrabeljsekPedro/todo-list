const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoTag = document.querySelector('.todo-tag-input');
const todoItemsList = document.querySelector('.todo-items');
const counter = document.querySelector('.counter');
const clearAllButton = document.querySelector('.clear-all');
const todoStored = localStorage.getItem('todos')
let todos = getTodosFromLocalStorage();
let valueBeforeEditIndex;

/* Event listeners*/

/* Listens to the refreshment of the page, inserts the objects from
the local storage and updates the counter */
addEventListener('DOMContentLoaded', (e) => {
  if (todos) {
    insertMultipleToListOnDom(todos);
    counterUpdate();
  } else {
    counterUpdate();
  }
});

/* Listens to the pressing of the "Add" button and runs 
the addTodo function */
todoForm.addEventListener('submit', function (e) {
 e.preventDefault();
  addTodo(todoInput.value,todoTag.value);
})

/* Listens to the pressing of the "Clear All" button and runs 
the clearAll function */
clearAllButton.addEventListener('click', () => {
  clearAll();
})

/* Functions*/

/* addTodo checks that the input is not empty, pushes the input in
an array saves the array into the local storage, updates the counter
and inserts said array in the DOM */
function addTodo(todo,todotag) {
  if (!todo) {
    alert('Please fill out the box');
    return;
  }
  todos.push(todo);
  saveTodosToLocalStorage(todos);
  counterUpdate();
  insertToListOnDom(todo,todotag);
}

/* Saves the array to the local storage by converting it into a string */
function saveTodosToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/* This function inserts the inputs and buttons on the DOM,
also it saves it to the local storage */
function insertToListOnDom(todo,todotag) {
  const todo_li = document.createElement('li');
  todo_li.classList.add('item');
  todoItemsList.appendChild(todo_li);

  /* Creates the input */
  const todo_input_li = document.createElement('input');
  todo_input_li.classList.add('text');
  todo_input_li.type = 'text';
  todo_input_li.value = todo;
  todo_input_li.setAttribute('disabled', '');

  /* Creates the tags */
  const todo_tag_li = document.createElement('div');
  todo_tag_li.classList.add('tag');
  todo_tag_li.innerText = todotag;

  /* Creates the "Edit" button */
  const todo_edit_li = document.createElement('button');
  todo_edit_li.classList.add('edit');
  todo_edit_li.innerHTML = 'Edit';

  /* Listens to the click of the "Edit" button and runs the 
  editTodoInput function */
  todo_edit_li.addEventListener('click', () => {
    editTodoInput(todo_edit_li, todo_input_li);
  });

  /* Creates the "Delete" button */
  const todo_delete_li = document.createElement('button');
  todo_delete_li.classList.add('delete');
  todo_delete_li.innerHTML = 'Delete';

  /* Listens to the click of the "Delete" button and runs the 
  deleteTodoInput function */
  todo_delete_li.addEventListener('click', () => {
    deleteTodoInput(todo_input_li,todo_li);
  })

  /* Appends the input and the buttons to the list of the "To Dos", as well
  as emptying the input value */
  todo_li.appendChild(todo_input_li);
  todo_li.appendChild(todo_edit_li);
  todo_li.appendChild(todo_delete_li);
  todo_li.appendChild(todo_tag_li);
  todoInput.value = '';
  todoTag.value = '';
}

/* Retrieves the todo array from the local storage, if it is empty it
creates an empty array */
function getTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    return [];
  }
}

/* Runs the function insertToListOnDom for every element on the todo array */
function insertMultipleToListOnDom(todos) {
  todos.forEach(todo => {
    insertToListOnDom(todo);
  })
}

/* Checks that the inner text of the button is "edit", changes
the value of the input and saves the old one so when the inner text
of the button changes into "Save" rewrites it on the DOM, on the array
and saves it to the local storage by checkingthe index */
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
  }
}

/* Removes the element on which you press the button on from the DOM and
from the array by checking the index, saves it to the local storage and
updates the counter */
function deleteTodoInput(todoDelete,todoElement) {
  const todoIndex = todos.indexOf(todoDelete.value)
  todos.splice(todoIndex,1);
  todoItemsList.removeChild(todoElement);
  saveTodosToLocalStorage(todos);
  counterUpdate();
}

/* Updates the counter by checking the length of the array */
function counterUpdate() {
  const counterNumber = todos.length;
  counter.innerHTML = `Number of To dos: ${counterNumber}`;
}

/* Clears the "to dos" list by emptying the DOM and the array, saves it
on the local storage and updates the counter */
function clearAll() {
  todoItemsList.innerHTML="";
  todos=[];
  saveTodosToLocalStorage(todos);
  counterUpdate();
}