<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <h1>To-do List</h1>
      </header>

      <div class="content">
        <section class="content__add">
          <h2 class="blind">할 일 추가</h2>
          <input
            type="text"
            class="add__input"
            v-model="userInput"
            @keyup="addNewTodo"
            placeholder="New To-do"
          >
        </section>
        <section class="content__items">
          <h2 class="blind">할 일</h2>
          <template v-for="todo in activeTodoList">
            <Todo
              :label="todo.label"
              :key="todo"
              :state="todo.state"
              @todoItemsClick="toggleTodoState(todo)"
            />
          </template>
        </section>

        <section class="content__btns">
          <h2 class="blind">할 일 분류 버튼</h2>
          <button
            v-for="btn in btnStates"
            :key="btn"
            @click="changeCurrentState(`${btn}`)"
            :class="`${btn}`"
          >{{btn}}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "./components/Todo";

export default {
  name: "app",
  data() {
    return {
      userInput: "",
      todoList: [
        {
          label: "Hello, Vue!",
          state: "active"
        }
      ],
      btnStates: ["all", "active", "done"],
      currentState: "all"
    };
  },
  computed: {
    activeTodoList() {
      return this.todoList.filter(
        todo => this.currentState === "all" || todo.state === this.currentState
      );
    }
  },
  methods: {
    changeCurrentState(state) {
      this.currentState = state;
    },
    addNewTodo(key) {
      // this.userInput.replace(/^\s+|\s+$/g, "");
      if (key.keyCode == 13 && this.userInput !== "") {
        this.todoList.push({
          label: this.userInput,
          state: "active"
        });
        this.userInput = "";
      }
    },
    toggleTodoState(todo) {
      if (todo.state === "active") {
        let conf = confirm("할 일을 모두 끝냈나요?");
        if (conf) {
          todo.state = "done";
        }
      }
    },
    btnStatesClick() {
      if (
        document
          .querySelectorAll(".content__btnStates button")
          .getAttribute("class") == "on"
      ) {
        document
          .querySelectorAll(".content__btnStates button")
          .setAttribute("class", "");
      } else {
        document
          .querySelectorAll(".content__btnStates button")
          .setAttribute("class", "on");
      }
    }
  },
  components: {
    Todo
  }
};

require("./css/reset.css");
require("./css/style.css");
</script>
