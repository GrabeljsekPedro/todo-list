const toDoContentAndTag = document.querySelector(".to-do");
const dueDateinput = document.querySelector(".due-date-input");
const todoNote = document.querySelector('.note-textarea')
const goBackButton = document.querySelector("#go-back");
const saveButton = document.querySelector("#save");

let toDoItem = localStorage.getItem('ToDoItemSelected');
toDoItem = JSON.parse(toDoItem);

addEventListener('DOMContentLoaded', () => {
    addToDoContentAndTag();
})


function addToDoContentAndTag() {
    const toDoContent = document.createElement('h2');
    toDoContent.classList.add('to-do-content');
    toDoContent.innerText = toDoItem[0];
    toDoContentAndTag.appendChild(toDoContent);
    const toDoTags = document.createElement('h2');
    toDoTags.classList.add('to-do-tags');
    toDoTags.innerText = toDoItem[1];
    toDoContentAndTag.appendChild(toDoTags);
}
