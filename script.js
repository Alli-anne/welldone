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
    getRandomAdvice();
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

export function renderWithTemplate(
  templateFn,
  parentElement,
  data = {},
  callback,
  position = "afterbegin",
  clear = true,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }
}
function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}
export async function loadHeaderFooter(){
 const headerTemplateFn = loadTemplate("/particals/header.html");
  const footerTemplateFn = loadTemplate("/particals/footer.html");
  const headerHTML = await headerTemplateFn();
  const footerHTML = await footerTemplateFn();
  const headerEl = document.querySelector("#header");
  const footerEl = document.querySelector("#footer");
  renderWithTemplate(() => headerHTML, headerEl);
  renderWithTemplate(() => footerHTML, footerEl);
}

loadHeaderFooter();