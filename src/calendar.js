import { loadHeaderFooter } from "./main.js";

export async function getDateInfo() {
    const dateInput = document.getElementById("date-input");
    const dateSubmit = document.getElementById("date-submit");

    dateSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        const date = dateInput.value;
        console.log(date);
        window.location.href = `calendar.html?date=${date}`;
        console.log(date);
        const loadList = loadTodos(date);
        console.log(loadList);
    });
}

function getDateFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("date");  // "2025-11-20"
}

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function loadTodosFromServer() {
    const date = getTodayDate();

    try {
        const res = await fetch(`https://welldone-api-fm06.onrender.com/lists/date/${date}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        const list = document.getElementById("finished-container2");
        list.innerHTML = "";

        data.forEach(entry => {
            let items = entry.todos;

            if (!items) return;

            if (typeof items === "string") {
                items = [{ title: items }];
            }

            if (Array.isArray(items)) {
                items.forEach(todo => {
                    const li = document.createElement("li");
                    li.textContent = todo.title;
                    list.appendChild(li);
                });
            }
        });

    } catch (err) {
        console.error("Error fetching todos:", err);
    }
}

export async function loadTodosFromServerUrl() {
    const date = getDateFromURL();
    try {
        const res = await fetch(`https://welldone-api-fm06.onrender.com/lists/date/${date}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        const list = document.getElementById("finished-container");
        

        data.forEach(entry => {
            let items = entry.todos;

            if (!items) return;

            if (typeof items === "string") {
                items = [{ title: items }];
            }

            if (Array.isArray(items)) {
                items.forEach(todo => {
                    const li = document.createElement("li");
                    li.textContent = todo.title;
                    list.appendChild(li);
                });
            }
            else if(!Array.isArray(items)) {
                alert("No todos for this date");
            }
        });
    } catch (err) {
        console.error("Error fetching todos:", err);
    }

    const dateDisplay = document.getElementById("date-display");
    if (dateDisplay) {
        dateDisplay.textContent = date;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodosFromServerUrl();
    loadTodosFromServer();
    getDateInfo();
    loadHeaderFooter();
});
