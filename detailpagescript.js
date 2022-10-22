const toDoContentAndTag = document.querySelector(".to-do");
const dueDateinput = document.querySelector(".due-date-input");
const todoNote = document.querySelector('.note-textarea')
const goBackButton = document.querySelector("#go-back");
const saveButton = document.querySelector("#save");

let newTodos = localStorage.getItem('todos');
newTodos = JSON.parse(newTodos);

let toDoItem = [localStorage.getItem('ToDoItemSelected')];
toDoItem = JSON.parse(toDoItem);

addEventListener('DOMContentLoaded', () => {
    addToDoContentAndTag();
    dueDateinput.value = toDoItem.dueDate;
    todoNote.innerHTML = toDoItem.notes;
})

saveButton.addEventListener('click', () => {
    addToDoNotesAndDuedate();
    localStorage.setItem('ToDoItemSelected', JSON.stringify(toDoItem));
    localStorage.setItem('todos', JSON.stringify(newTodos));
})

goBackButton.addEventListener('click', () => {
    history.back();
})

function addToDoContentAndTag() {
    const toDoContent = document.createElement('h2');
    toDoContent.classList.add('to-do-content');
    toDoContent.innerText = toDoItem.content;
    toDoContentAndTag.appendChild(toDoContent);
    const toDoTags = document.createElement('h2');
    toDoTags.classList.add('to-do-tags');
    toDoTags.innerText = toDoItem.tags.toString().replace(/,/g," ");
    toDoContentAndTag.appendChild(toDoTags);
}

function addToDoNotesAndDuedate(){
    toDoItem.notes = todoNote.value;
    toDoItem.dueDate = dueDateinput.value;
    newTodos[newTodos.findIndex(object => {
        return object.index === toDoItem.index;
    })].dueDate = toDoItem.dueDate;

    newTodos[newTodos.findIndex(object => {
        return object.index === toDoItem.index;
    })].notes = toDoItem.notes;
}