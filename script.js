const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoTag = document.querySelector('.todo-tag-input');
const todoItemsList = document.querySelector('.todo-items');
const counter = document.querySelector('.counter');
const clearAllButton = document.querySelector('.clear-all');
const todoTagSelect = document.querySelector('.tag-options');
const todoStored = localStorage.getItem('todos')
let newTodos = getTodosFromLocalStorage();
let valueBeforeEditIndex;

/* Event listeners*/

/* Listens to the refreshment of the page, inserts the objects from
the local storage and updates the counter */
addEventListener('DOMContentLoaded', () => {
  if (newTodos) {
    insertMultipleToListOnDom(newTodos);
    insertMultipleOptions();
    counterUpdate();
  } else {
    insertMultipleOptions();
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

todoTagSelect.addEventListener('change', () =>{
  if (todoTagSelect.selectedIndex === 0) {
    todoItemsList.innerHTML="";
    insertMultipleToListOnDom(newTodos);
  } else {
    displayFilteredTags();
  }
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
  newTodos.push({
    content: todo,
    tags: todotag,
  });
  newTodos[newTodos.length-1].tags = newTodos[newTodos.length-1].tags.split(' ');
  saveTodosToLocalStorage(newTodos);
  insertMultipleOptions();
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
  const todo_tag_div = document.createElement('div');
  const todo_tag_li = document.createElement('input');
  todo_tag_li.classList.add('tag');
  todo_tag_li.type = 'text';
  todo_tag_li.value = todotag;
  todo_tag_li.setAttribute('disabled', '');
  todo_tag_div.appendChild(todo_tag_li);

  /* Creates the "Edit" button */
  const todo_edit_li = document.createElement('button');
  todo_edit_li.classList.add('edit');
  todo_edit_li.innerHTML = 'Edit';

  /* Listens to the click of the "Edit" button and runs the 
  editTodoInput function */
  todo_edit_li.addEventListener('click', () => {
    editTodoInput(todo_edit_li, todo_input_li, todo_tag_li);
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

  /* Creates the "Details" button */
  const todo_details_li = document.createElement('button');
  todo_details_li.classList.add('detail');
  todo_details_li.innerHTML = 'Details';

  todo_details_li.addEventListener('click', () => {
    localStorage.setItem('ToDoItemSelected', JSON.stringify([todo_input_li.value, todo_tag_li.value]));
    window.open('./detailpage.html',"_self");
  })

  /* Appends the input and the buttons to the list of the "To Dos", as well
  as emptying the input value */
  todo_li.appendChild(todo_input_li);
  todo_li.appendChild(todo_edit_li);
  todo_li.appendChild(todo_delete_li);
  todo_li.appendChild(todo_details_li);
  todo_li.appendChild(todo_tag_div);
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
  todos.forEach((todo) => {
    insertToListOnDom(todo.content,todo.tags.toString().replace(/,/g," "));
  })
}

/* Checks that the inner text of the button is "edit", changes
the value of the input and saves the old one so when the inner text
of the button changes into "Save" rewrites it on the DOM, on the array
and saves it to the local storage by checkingthe index */
function editTodoInput(todoEdit, todoInput, todoTagInput) {
  if (todoEdit.innerText.toLowerCase() === 'edit') {
    const oldInputValue = todoInput.value;
    valueBeforeEditIndex = newTodos.findIndex(object => {
      return object.content === oldInputValue;
    });
    todoInput.removeAttribute('disabled');
    todoTagInput.removeAttribute('disabled');
    todoInput.focus();
    todoEdit.innerText = 'Save';
  } else {
    todoInput.setAttribute('disabled', '');
    todoTagInput.setAttribute('disabled', '');
    todoEdit.innerText = 'Edit';
    newTodos[valueBeforeEditIndex] = {
      content: todoInput.value,
      tags: todoTagInput.value
    };
    newTodos[valueBeforeEditIndex].tags = newTodos[valueBeforeEditIndex].tags.split(' ');
    saveTodosToLocalStorage(newTodos);
    insertMultipleOptions();
  }
}

/* Removes the element on which you press the button on from the DOM and
from the array by checking the index, saves it to the local storage and
updates the counter */
function deleteTodoInput(todoDelete,todoElement) {
  const todoIndex = newTodos.findIndex(object => {
    return object.content === todoDelete.value;
  });
  newTodos.splice(todoIndex,1);
  todoItemsList.removeChild(todoElement);
  saveTodosToLocalStorage(newTodos);
  insertMultipleOptions();
  counterUpdate();
}
/* Updates the counter by checking the length of the array */
function counterUpdate() {
  const counterNumber = newTodos.length;
  counter.innerHTML = `Number of To dos: ${counterNumber}`;
}

/* Clears the "to dos" list by emptying the DOM and the array, saves it
on the local storage and updates the counter */
function clearAll() {
  todoItemsList.innerHTML="";
  newTodos=[];
  saveTodosToLocalStorage(newTodos);
  counterUpdate();
  insertMultipleOptions();
}

/* Creates an option that appends to todoTagSelect*/
function insertOptions(tag) {
  const todo_option = document.createElement('option');
  todo_option.classList.add('option');
  todo_option.innerHTML = tag;
  todoTagSelect.appendChild(todo_option);
}

/* Creates a default tag option, creates an array that adds all the tags on the newTodos, 
it removes the duplicate values and uses it to insert the values inside the select*/ 
function insertMultipleOptions() {
  todoTagSelect.innerHTML="";
  const todo_option = document.createElement('option');
  todo_option.classList.add('option');
  todo_option.innerHTML = "-- Select a tag --";
  todoTagSelect.appendChild(todo_option);
  let tagCheck = [];
  newTodos.forEach((todo) => {
    todo.tags.forEach((tag) => {
      tagCheck.push(tag);
    })
  })
  tagCheck = [...new Set(tagCheck)];
  tagCheck.forEach((todo) => {
    insertOptions(todo);
  })
}
/* Erases the todo list on the DOM and inserts the selected filtered tag by running two "foreaches" 
and checking if the selected tag is equal to one of the todo tags*/
function displayFilteredTags() {
  todoItemsList.innerHTML="";
  newTodos.forEach((todo) => {
    todo.tags.forEach((tag) => {
      if (todoTagSelect.options[todoTagSelect.selectedIndex].value === tag) {
        insertToListOnDom(todo.content,todo.tags.toString().replace(/,/g," "));
      }
      else {
        return;
      }
    })
  })
}