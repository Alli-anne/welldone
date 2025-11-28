import { loadHeaderFooter } from "./main.js";


export async function getDateInfo(){
    const dateInput = document.getElementById("date-input");
    const dateSubmit = document.getElementById("date-submit");

    dateSubmit.addEventListener("click", (event) =>{
        event.preventDefault();
        const date = dateInput.value;
        console.log(date);
        window.location.href = `calendar.html?date=${date}`
        console.log(date);
        const loadList =  loadTodos(date);
        console.log(loadList);
    })
}
function getDateFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("date");  // "2025-11-20"
}


export async function loadTodos() {
    try {
        const date = getDateFromURL();
        console.log("Fetching todos for date:", date);

        const res = await fetch(`https://welldone-api-fm06.onrender.com/lists/date/${date}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json(); // array of list objects
        console.log(data);

        const finishedList = document.getElementById("finished-container");
        finishedList.innerHTML = ""; // clear previous items

        data.forEach(listObj => {
            const todos = listObj.todos;

            if (Array.isArray(todos)) {
                // Handle array of objects
                todos.forEach(todoItem => {
                    const li = document.createElement("li");
                    li.textContent = todoItem.title || JSON.stringify(todoItem);
                    finishedList.appendChild(li);
                });
            } else if (typeof todos === "string") {
                // Handle string directly
                const li = document.createElement("li");
                li.textContent = todos;
                finishedList.appendChild(li);
            }
        });

    } catch (err) {
        console.error("Error fetching todos:", err);
    }
}


loadTodos();

getDateInfo();
loadHeaderFooter();