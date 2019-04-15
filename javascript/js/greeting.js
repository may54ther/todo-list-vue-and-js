const wrapTag = document.querySelector(".wrap"),
  popup = document.querySelector(".popup"),
  input = popup.querySelector("input"),
  greeting = document.querySelector(".header__greetings");

const USER_LS = "userName";

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = input.value.trim();
  if (currentValue != "") {
    paintGreeting(currentValue);
    saveName(currentValue);
  }
}

function askForName() {
  popup.classList.add("on");
  greeting.classList.remove("on");

  popup.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
  popup.classList.remove("on");
  wrapTag.style.display = "block";
  greeting.classList.add("on");

  greeting.innerText = `안녕, ${name}!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
