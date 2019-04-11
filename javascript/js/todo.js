const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "to-doList";
let toDoArr = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanTodos = toDoArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDoArr = cleanTodos;
  saveToDos();

  // const delId = event.target.parentNode.id;
  // const target = document.getElementById(delId);
  // target.remove();

  // const delItem = localStorage.getItem("id", delId);
  // delItem.remove();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDoArr));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoArr.length + 1;

  delBtn.innerText = "❌";
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
  let currentValues = toDoInput.value;
  paintToDo(currentValues);
  toDoInput.value = "";
}

function loadTodos() {
  const loadeshTodos = localStorage.getItem(TODOS_LS);

  if (loadeshTodos !== null) {
    const parseToDos = JSON.parse(loadeshTodos);
    parseToDos.forEach(function(item) {
      paintToDo(item.text);
    });
  } else {
    //
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
