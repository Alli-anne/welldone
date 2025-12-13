// Header
import {loadHeaderFooter} from "./main.js";
import { getDateInfo, loadTodosFromServer, getTodayDate, loadTodosFromServerUrl} from "./calendar.js";
import { createUser} from "./login.js";
import {renderWeeklyAnalytics} from "./reflection.js";

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

export async function todoSubmitFunction() {
    const newTodo = todoInput.value.trim();
    if (!newTodo) return;

    // Display the new todo
    const listItem = document.createElement("li");
    listItem.textContent = newTodo;
    finishedList.appendChild(listItem);

    // Save locally
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ title: newTodo, date: getDate() });
    localStorage.setItem("todos", JSON.stringify(todos));

    // Send to backend (single item)
    await addTodoToServer(newTodo);

    todoInput.value = "";
    const design = document.getElementById("alert-info");
    design.style.display = "block";
    getRandomAdvice();
}

// function getUserId() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user ? user.user_id : null;   // returns logged-in user's ID
// }
async function addTodoToServer(todo) {
    try {
        const res = await fetch("https://welldone-api-fm06.onrender.com/lists/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                todos: todo,
                date: getDate()
            })
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const result = await res.json();
        console.log("Todo sent to server:", result);
        alert("Todo sent to server!");
         



    } catch (err) {
        console.error("Error sending todo:", err);
        alert("Error sending todo. Please try again.");
    }
}
/**
 * Load todos from localStorage and display them in the finished list.
 */
loadTodosFromServer();

// function updateCount() {
//     let count = finishedList.children.length;

//     if (count === 0) {
//         countDisplay.innerHTML = `You still have time to be productive`;
//     } else {
//         countDisplay.innerHTML = `You have ${count} things done today`;
//     }
//     console.log(count);
    
    
// }





todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    todoSubmitFunction();
});


yesButton.addEventListener("click", yesAndNo);
noButton.addEventListener("click", yesAndNo);
getTodayDate();
getDateInfo();


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

// async function fetchLists() {
//   try {
//     const res = await fetch("https://welldone-api.onrender.com/lists");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const lists = await res.json();
//     console.log(lists);

//     // Example: display in HTML
//     const listContainer = document.getElementById("list-container");
//     listContainer.innerHTML = lists.map(item => `<li>${item.title}</li>`).join("");
//   } catch (err) {
//     console.error("Error fetching lists:", err);
//   }
// }
export async function createList() {
  let todos2 = document.getElementById("todo-input").value;
  try {
    const res = await fetch("https://welldone-api-fm06.onrender.com/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todos: todos2, date: getDate() })
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const list = await res.json();
    console.log(list);
    alert("List created successfully!");
  } catch (err) {
    console.error("Error creating list:", err);
    alert("Error creating list. Please try again.");
  }
}

function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}


function addDesign(){
    const design = document.getElementById("addDesign");
    design.style.display = "block";
}

