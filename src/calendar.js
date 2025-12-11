import { loadHeaderFooter } from "./main.js";

export async function getDateInfo() {
    const dateInput = document.getElementById("date-input");
    const dateSubmit = document.getElementById("date-submit");

    if (!dateInput || !dateSubmit) {
        // Silently return - these elements may not exist on all pages
        return;
    }

    dateSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        const date = dateInput.value;
        if (!date) return;
        window.location.href = `calendar.html?date=${date}`;
    });
}

function getDateFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("date");
}

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function populateList(listId, date) {
    const list = document.getElementById(listId);
    if (!list) {
        // Silently return - this container may not exist on all pages
        return;
    }
    list.innerHTML = "";

    try {
        const res = await fetch(`https://welldone-api-fm06.onrender.com/lists/date/${date}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        data.forEach(entry => {
            let items = entry.todos;
            if (!items) return;

            if (typeof items === "string") items = [{ title: items }];

            if (Array.isArray(items)) {
                items.forEach(todo => {
                    const li = document.createElement("li");
                    li.textContent = todo.title;
                    list.appendChild(li);
                });
            }
        });
    } catch (err) {
        console.error(`Error fetching todos for ${listId}:`, err);
    }
}

export async function loadTodosFromServer() {
    const date = getTodayDate();
    await populateList("finished-container2", date);
}

export async function loadTodosFromServerUrl() {
    const date = getDateFromURL() || getTodayDate();
    await populateList("finished-container", date);

    const dateDisplay = document.getElementById("date-display");
    if (dateDisplay) dateDisplay.textContent = date;
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodosFromServerUrl();
    loadTodosFromServer();
    getDateInfo();
    loadHeaderFooter();
});


