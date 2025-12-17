import { loadHeaderFooter } from "./main.js";



function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(d);
  start.setDate(d.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function filterTodosByWeek(todos, date = new Date()) {
  const { start, end } = getWeekRange(date);

  return todos.filter(todo => {
    const todoDate = new Date(todo.date);
    return todoDate >= start && todoDate <= end;
  });
}



export function getMostDoneTask(todos) {
  const counts = {};

  todos.forEach(todo => {
    const task = todo.todo;
    counts[task] = (counts[task] || 0) + 1;
  });

  let maxTask = null;
  let maxCount = 0;

  for (const task in counts) {
    if (counts[task] > maxCount) {
      maxTask = task;
      maxCount = counts[task];
    }
  }

  return { task: maxTask, count: maxCount };
}

function getMostProductiveDay(todos) {
  const days = {};

  todos.forEach(todo => {
    const day = new Date(todo.date).toLocaleDateString("en-US", {
      weekday: "long"
    });

    days[day] = (days[day] || 0) + 1;
  });

  let bestDay = null;
  let max = 0;

  for (const day in days) {
    if (days[day] > max) {
      bestDay = day;
      max = days[day];
    }
  }

  return { day: bestDay, count: max };
}

function getLongestStreak(todos) {
  if (todos.length === 0) return 0;

  const uniqueDays = new Set(
    todos.map(t => new Date(t.date).toDateString())
  );

  const dates = [...uniqueDays]
    .map(d => new Date(d))
    .sort((a, b) => a - b);

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

/* =========================
   MAIN WEEKLY ANALYTICS
========================= */

async function getAnalyticsForWeek(date = new Date()) {
  const res = await fetch("https://welldone-api-fm06.onrender.com/lists");
  const todos = await res.json();

  const weekTodos = filterTodosByWeek(todos, date);

  if (weekTodos.length === 0) {
    return {
      weekCount: 0,
      mostDoneTask: { task: "-", count: 0 },
      mostProductiveDay: { day: "—", count: 0 },
      longestStreak: 0
    };
  }

  return {
    weekCount: weekTodos.length,
    mostDoneTask: getMostDoneTask(weekTodos),
    mostProductiveDay: getMostProductiveDay(weekTodos),
    longestStreak: getLongestStreak(weekTodos)
  };
}

/* =========================
   RENDER TO DOM
========================= */

export async function renderWeeklyAnalytics(date = new Date()) {
  const stats = await getAnalyticsForWeek(date);

  document.getElementById("todo-count").textContent =
    stats.weekCount;

  // document.getElementById("most-done").textContent =
  //   stats.mostDoneTask.task;

  document.getElementById("most-done-day").textContent =
    stats.mostProductiveDay.day;

  document.getElementById("Streak").textContent =
    stats.longestStreak;
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  renderWeeklyAnalytics();
});

const dateForm = document.querySelector("form");
const dateInput = document.getElementById("date-input");

dateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!dateInput.value) return;

  const selectedDate = new Date(dateInput.value);
  renderWeeklyAnalytics(selectedDate);
});

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  renderWeeklyAnalytics(); // defaults to current week
});