const toDoForm = document.querySelector(".form__todo"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".list__todo");

const TODOS_LS = "to-doList";
let toDoArr = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const conf = confirm("삭제하실래요?");
  if (conf) {
    toDoList.removeChild(li);

    const cleanTodos = toDoArr.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });

    toDoArr = cleanTodos;
    saveToDos();
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDoArr));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoArr.length + 1;

  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDoArr.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  let currentValues = toDoInput.value.trim();
  if (currentValues != "") {
    paintToDo(currentValues);
    toDoInput.value = "";
  }
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);

  if (loadedTodos !== null) {
    const parseToDos = JSON.parse(loadedTodos);
    parseToDos.forEach(function(item) {
      paintToDo(item.text);
    });
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
