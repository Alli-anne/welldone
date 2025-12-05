import { loadHeaderFooter } from "./main.js";
import { loadTodos, getTodayDate } from "./calendar.js";
date = getTodayDate();

console.log(date);

loadTodos();

loadHeaderFooter();