import { loadHeaderFooter } from "./main.js";
import { loadTodosFromServer, getDateInfo } from "./calendar.js";
import {todoSubmitFunction} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
    getDateInfo();
    loadTodosFromServer();
    loadHeaderFooter();
    todoSubmitFunction();
});
