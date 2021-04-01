function load() {

    const jsonData = localStorage.getItem("Tasks");

    if (!(localStorage.getItem("ID"))) {
        localStorage.setItem("ID", "0");
    }

    if (jsonData) {
        const section = document.getElementById("section");
        const dataArray = JSON.parse(jsonData);
        for (let task of dataArray) {
            const div = createDiv();
            const deleteBtn = createDeleteButton(task.Id);
            const textArea = createTextArea();
            textArea.innerText = task.task;
            const spanDate = createSpan();
            spanDate.innerText = task.date + '\n';
            const spanHour = createSpan();
            spanHour.innerText = task.hour;


            div.appendChild(deleteBtn);
            div.appendChild(textArea);
            div.appendChild(spanDate);
            div.appendChild(spanHour);
            section.appendChild(div);
        }


    }
}

function add() {

    let globalId = localStorage.getItem("ID");


    const form = document.getElementById("form");
    const section = document.getElementById("section");

    let result1 = validationTask(form.task);
    let result2 = validationDate(form.date);
    let result3 = validationHour(form.hour);

    if (result1 && result2 && result3) {

        const Task = form.task.value;
        const d = form.date.value;
        const hour = form.hour.value;
        const div = createDiv();
        let deleteBtn = createDeleteButton(globalId);

        saveToLocalStorage(Task, d, hour, globalId);
        globalId = (+globalId + 1).toString();
        localStorage.setItem("ID", globalId);

        const textArea = createTextArea();
        textArea.innerText = Task;
        const spanDate = createSpan();
        spanDate.innerText = d + "\n";
        const spanHour = createSpan();
        spanHour.innerText = hour;



        div.appendChild(deleteBtn);
        div.appendChild(textArea);
        div.appendChild(spanDate);
        div.appendChild(spanHour);
        section.appendChild(div);

        Clear(form);

    }


}


function Clear(form) {
    form.task.value = "";
    form.date.value = "";
    form.hour.value = "";

}


function validationTask(inputTask) {
    const taskText = inputTask.value;
    const taskError = document.getElementById("taskError");
    taskError.innerText = ""

    if (taskText === "") {
        taskError.innerText = "this is required field"
        return false;
    }
    return true;
}


function validationDate(inputDate) {

    const dateText = inputDate.value;

    const dateError = document.getElementById("dateError");
    dateError.innerText = ""

    if (dateText === "") {
        dateError.innerText = "this is required field";
        return false;

    }
    return true;
}

function validationHour(inputHour) {
    const hourText = inputHour.value.trim();
    const hourError = document.getElementById("hourError");
    hourError.innerText = ""

    let ptr = new RegExp("^(2[0-3]|[01][0-9]):([0-5][0-9])$");
    let res = ptr.test(hourText);

    if (!res && hourText !== "") {
        hourError.innerText = "the hour must be in this format hh:mm";
        return false;
    }

    return true;

}

function saveToLocalStorage(taskValue, dateValue, hourValue, globalId) {
    let dataArray = []
    const JsonArray = localStorage.getItem("Tasks");
    if (JsonArray) {
        dataArray = JSON.parse(JsonArray);
    }
    const task = {
        Id: globalId,
        task: taskValue,
        date: dateValue,
        hour: hourValue
    }

    dataArray.push(task);
    localStorage.setItem("Tasks", JSON.stringify(dataArray));

}

function createDeleteButton(globalId) {
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("fixPlace");
    deleteBtn.classList.add("glyphicon");
    deleteBtn.classList.add("glyphicon-remove-circle");
    deleteBtn.setAttribute("id", globalId)
    deleteBtn.setAttribute("onclick", "removeDiv(this)")

    return deleteBtn;


}

function createDiv() {
    let Div = document.createElement("div");
    Div.classList.add("make");
    Div.setAttribute("onmouseover", "displayDeleteBtn(this)")
    Div.setAttribute("onmouseout", "hideDeleteBtn(this)")
    return Div;
}

function createTextArea() {
    let textArea = document.createElement("textarea");
    textArea.setAttribute("disabled", "true");
    return textArea;

}

function createSpan() {
    let span = document.createElement("span");
    span.classList.add("dateFix");
    return span;
}

function displayDeleteBtn(Div) {
    const btn = (Div.childNodes)[0]
    btn.style.visibility = "visible";
}


function hideDeleteBtn(Div) {
    const btn = (Div.childNodes)[0]
    btn.style.visibility = "hidden";


}

function removeDiv(btn) {
    const taskId = btn.id;
    btn.parentElement.remove();
    const JsonData = localStorage.getItem("Tasks");
    if (JsonData) {
        const dataArray = JSON.parse(JsonData);
        let i = 0;

        for (let task of dataArray) {

            if (task.Id === taskId) {
                dataArray.splice(i, 1)
            }
            i = i + 1;



        }

        localStorage.setItem("Tasks", JSON.stringify(dataArray));






    }
}





load();