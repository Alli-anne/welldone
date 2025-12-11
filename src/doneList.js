import { loadHeaderFooter } from "./main.js";
import { loadTodosFromServer, getDateInfo } from "./calendar.js";

document.addEventListener("DOMContentLoaded", () => {
    getDateInfo();
    loadTodosFromServer();
    loadHeaderFooter();
});
