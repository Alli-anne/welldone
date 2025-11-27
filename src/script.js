// Header
import {loadHeaderFooter} from "./main.js";
import { getDateInfo } from "./calendar.js";

loadHeaderFooter();
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
    getRandomAdvice();
}
/**
 * Load todos from localStorage and display them in the finished list.
 */
function loadTodos() {
    // Retrieve todos from localStorage, or an empty array if none exist.
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    createList(todos);

    // For each todo in the array, create a list item and append it to the finished list.
    todos.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.textContent = todo;
        finishedList.appendChild(listItem);
    });
    updateCount();
}
function updateCount() {
    let count = finishedList.children.length;

    if (count === 0) {
        countDisplay.innerHTML = `You still have time to be productive`;
    } else {
        countDisplay.innerHTML = `You have ${count} things done today`;
    }

    console.log(count);
    
    
}


document.addEventListener("DOMContentLoaded", loadTodos);


todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    todoSubmitFunction();
});


yesButton.addEventListener("click", yesAndNo);
noButton.addEventListener("click", yesAndNo);

async function getRandomAdvice(){
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        
        const quote = data.slip.advice;
        const advice = document.getElementById("advice");
        advice.textContent = quote;
        
    } catch (error) {
        console.error(error);
    }
}

async function fetchLists() {
  try {
    const res = await fetch("https://welldone-api.onrender.com/lists");
    if (!res.ok) throw new Error("Network response was not ok");
    const lists = await res.json();
    console.log(lists);

    // Example: display in HTML
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = lists.map(item => `<li>${item.title}</li>`).join("");
  } catch (err) {
    console.error("Error fetching lists:", err);
  }
}
async function createList(todos) {
  try {
    const res = await fetch("https://welldone-api.onrender.com/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: `List ${Date.now()}`}, {todos})
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const list = await res.json();
    console.log(list);
  } catch (err) {
    console.error("Error creating list:", err);
  }
}

createList();

// Call it when the page loads
fetchLists();