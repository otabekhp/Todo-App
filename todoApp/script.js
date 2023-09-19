'use strict';
// Data 
const todo1 = {
    text: "Bozorlik qilish",
    status: "inProgress",
    id: "td1",
    date: "2020-11-03T12:18:26.937Z",
}
const todo2 = {
    text: "Maktabdan bolalarni olish",
    status: "inProgress",
    id: "td2",
    date: "2021-01-02T09:25:16.937Z",
}
const todo3 = {
    text: "Ovqat tayyorlash",
    status: "completed",
    id: "td3",
    date: "2022-06-08T10:49:24.874Z",
}


const todos = [todo1, todo2, todo3];

// constants 
const todosUl = document.querySelector(".todos");
const btnAdd = document.querySelector(".btn_add");

// ******* DELET FUNCTION ******* //
const deleteItem = function (event) {
    // console.log(event.target.parentElement.value);
    const id = event.target.parentElement.value;
    // console.log(id);
    const findTodoItem = todos.find(todo => todo.id === id);
    // console.log(findTodoItem);
    findTodoItem.status = "removed";
    // console.log(findTodoItem);
    updatedTodosUI();

}
const addDeleteListener = function () {
    const delBtns = document.querySelectorAll(".btn-delete");
    // console.log(delBtns);
    delBtns.forEach(btn => btn.addEventListener("click", deleteItem));

}

// ******* COMPLETED FUNCTION ******* //
const completed = (event) => {
    // console.log(event.target.value);
    const id = event.target.value;
    // console.log(id);
    const findForCompleted = todos.find(todo => todo.id === id);
    // console.log(findForCompleted);

    findForCompleted.status = findForCompleted.status !== "completed" ? "completed" : "inProgress";

    updatedTodosUI();
}


const addCompletedListener = function () {
    const checkBtns = document.querySelectorAll(".btn-check");
    // console.log(checkBtns);
    checkBtns.forEach(btn => btn.addEventListener("click", completed));
}

const formatted = function (date) {

    const intlObj = Intl.DateTimeFormat(navigator.language,
        {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",

        }).format(new Date(date));

    return intlObj;
}


const updatedTodosUI = function () {

    todosUl.innerHTML = ""; 
    btnAdd.classList.remove("hidden");

    const newTodos = todos.filter(todo => todo.status != "removed");
    // console.log("todos :", todos);
    // console.log("newTodos : ", newTodos);


    newTodos.forEach(todo => {
        // console.log(todo);

        const li = `
        <li class="todo-item ${todo.status === "completed" ? "completed" : ""}">
        <div class="todo-text">
            <button class="btn-check" value="${todo.id}"></button>
            <div>
               <span class="strike">${todo.text}</span>
               <br>
               <span>${formatted(todo.date)}</span>
            </div>
        </div>
        <div class="btns">
              <button class="editBtn" value="${todo.id}">Edit</button>
              <button class="btn-delete ${todo.status === "completed" ? "hidden" : ""}" value="${todo.id}">
                <img src="img/remove-icon.svg" alt="remove">
              </button>
        </div>

    </li>
     `;
        todosUl.insertAdjacentHTML("afterbegin", li); // bu metod tarjimasi => qo'shni HTMLni kiriting degani u o'ziga
        //  2 ta parametr qabul qiladi qayerga ko'chirib o'tkazay nimanin ko'chirib o'tkazay 
        // birinchi parametri 4 usuli bor 1.afterbegin 2.afterend 3.beforebegin 4.beforeend shu to'rt xolat bo'yicha chizadi
    });

    addDeleteListener();
    addCompletedListener();
    addEditListener();

}
// console.log(todos);
updatedTodosUI();


// arryning find metodi
// const str = [2, 3,  6];
// console.log(str.find(e => e === 4));

// ******* MODAL CREATE ******* //

// ELEMENTS
const modal = document.querySelector(".overlay");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const modalInput = document.querySelector(".modalInput");

btnAdd.addEventListener("click", () => {

    modalInput.value = "";

    modal.classList.remove("showHide");
});

cancelBtn.addEventListener("click", () => {

    modal.classList.add("showHide");
});

saveBtn.addEventListener("click", () => {

    // console.dir(modalInput.value);

    if (modalInput.value.trim()) {

        modal.classList.add("showHide");

        const obj = {
            text: modalInput.value,
            status: "inProgress",
            id: `td${todos.length + 1}`,
            date: new Date().toISOString(),
        };

        todos.push(obj);
        updatedTodosUI();
    }
});

// ******* MENU SORT CREATE ******* //


// ELEMENTS
const btnSort = document.querySelector(".btn-sort");
const menuSort = document.querySelector(".menu-sort");


btnSort.addEventListener("click", () => {

    menuSort.classList.toggle("hide");
});

const allBtn = document.querySelector("#all");
const completedBtn = document.querySelector("#completed");
const inprogressBtn = document.querySelector("#inProgress");
const removedBtn = document.querySelector("#removed");

allBtn.addEventListener("click", updatedTodosUI);

const renderSelectingMenu = (event) => {

    todosUl.innerHTML = "";

    //  console.log(event.target.id);
    const status = event.target.id;
    // console.log(status);

    const todosCompleted = todos.filter(todo => todo.status === status);
    console.log(todosCompleted);

    todosCompleted.forEach(todo => {

        const li = `
        <li class="todo-item ${todo.status === "completed" ? "completed" : ""}" value="${todo.id}">
        <div class="todo-text">
            <button class="btn-check" value="${todo.id}"></button>
            <span>${todo.text}</span>
        </div>
        <button class="btn-delete ${todo.status === "completed" ? "hidden" : ""}">
            <img src="img/remove-icon.svg" alt="">
        </button>
    </li>
        `;
        todosUl.insertAdjacentHTML("afterbegin", li);
    });

    // btnAdd.innerHTML = ""; junor usuli
    btnAdd.classList.add("hidden");
    addCompletedListener();

};

completedBtn.addEventListener("click", renderSelectingMenu);

inprogressBtn.addEventListener("click", renderSelectingMenu);

removedBtn.addEventListener("click", renderSelectingMenu);

// ******* EDIT BTNS FUNCTION ******* //
let id;
// console.log(id);

function addEditListener() {

    const edit = document.querySelectorAll(".editBtn");
    // console.log(edit);
    const modalEdit = document.querySelector(".overlayForEdit");
    const modalInputEdit = document.querySelector(".modalInputEdit");
    const saveEdit = document.querySelector(".saveEdit");
    const cancelEdit = document.querySelector(".cancelEdit");

    const showHide = (event) => {
        id = event.target.value;
        console.log(id);
        modalEdit.classList.remove("showHide");
        // console.log(event.target.value);
        const selectedTodo = todos.find(todo => todo.id === id);
        // console.log(selectedTodo);
        modalInputEdit.value = selectedTodo.text;
    }

    edit.forEach(btn => btn.addEventListener("click", showHide));
    
    saveEdit.addEventListener("click", () => {

        modalEdit.classList.add("showHide");
        const saveTodo = todos.find(todo => todo.id === id);
        saveTodo.text = modalInputEdit.value;

        updatedTodosUI();
    });

    cancelEdit.addEventListener("click", () => {
        modalEdit.classList.add("showHide");
        modalInputEdit.value = "";
    });
};



