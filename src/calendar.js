import { loadHeaderFooter } from "./main.js";


export function getDateInfo(){
    const dateInput = document.getElementById("date-input");
    const dateSubmit = document.getElementById("date-submit");

    dateSubmit.addEventListener("click", (event) =>{
        event.preventDefault();
        const date = dateInput.value;
        console.log(date);
        router.go(`/calendar/${date}`);
    })
}

getDateInfo();
loadHeaderFooter();