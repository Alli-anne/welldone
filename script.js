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
        localStorage.removeItem("todos");
        location.reload();
        console.log("page refreshed");
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
/**
 * Load todos from localStorage and display them in the finished list.
 */
function loadTodos() {
    // Retrieve todos from localStorage, or an empty array if none exist.
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // For each todo in the array, create a list item and append it to the finished list.
    todos.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.textContent = todo;
        finishedList.appendChild(listItem);
    });
    updateCount();
}
/*******  f98fe8b1-6a07-42eb-9bf4-cd17030a53e7  *******/
function updateCount() {
    let count = finishedList.children.length;

    if (count === 0) {
        countDisplay.innerHTML = `You still have time to be productive`;
    } else {
        countDisplay.innerHTML = `You have ${count} things done today`;
    }

    console.log(count);
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
