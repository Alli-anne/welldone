// Header
const header = document.getElementById("header");
const title = document.getElementById("title");
const tagline = document.getElementById("tagline");

// Main - Todo section
const todoSection = document.getElementById("todo-section");
const todoHeading = document.getElementById("todo-heading");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoSubmit = document.getElementById("todo-submit");
const finishedContainer = document.getElementById("finished-container");
const finishedList = document.getElementById("finished-list");

// More info section
const moreInfo = document.getElementById("more-info");
const countDisplay = document.getElementById("count-display");
const successfulContainer = document.getElementById("successful-container");
const successQuestion = document.getElementById("success-question");
const successForm = document.getElementById("success-form");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");

// Footer
const footer = document.getElementById("footer");
const footerLogo = document.getElementById("footer-logo");


function yesAndNo(event) {
    if (event.target === yesButton) {
        alert("You did it!");
    } else if (event.target === noButton) {
        alert("You did not do it!");
    }
}

function todoSubmitFunction() {
    const listItem = document.createElement("li");
    listItem.textContent = todoInput.value;

    finishedList.appendChild(listItem);

    // Save to localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoInput.value);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";
}
function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.textContent = todo;
        finishedList.appendChild(listItem);
    });
}

// Run this when the page loads
document.addEventListener("DOMContentLoaded", loadTodos);


todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    todoSubmitFunction();
});

// Add event listeners
yesButton.addEventListener("click", yesAndNo);
noButton.addEventListener("click", yesAndNo);
