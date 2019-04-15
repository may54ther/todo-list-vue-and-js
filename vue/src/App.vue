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
          <ul>
            <template v-for="todo in activeTodoList">
              <Todo
                :label="todo.label"
                :state="todo.state"
                @todoItemsClick="toggleTodoState(todo)"
              />
            </template>
          </ul>
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
        },
        {
          label: "Hello, CSS!",
          state: "done"
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
      let targetBtns = Array.from(
        document.querySelector(".content__btns ").getElementsByTagName("button")
      );

      targetBtns.filter(btn =>
        btn.classList.contains(`${state}`)
          ? btn.classList.add("on")
          : btn.classList.remove("on")
      );
    },
    addNewTodo(key) {
      if (key.keyCode == 13 && this.userInput.trim() != "") {
        this.todoList.push({
          label: this.userInput,
          state: "active"
        });
        this.userInput = "";
      }
    },
    toggleTodoState(todo) {
      if (todo.state === "active") {
        let conf = confirm("Are you done?");
        if (conf) {
          todo.state = "done";
        }
      }
    }
  },
  components: {
    Todo
  },
  mounted() {
    document.querySelector(".all").classList.add("on");
  }
};
</script>

<style src="./css/reset.css"></style>
<style src="./css/style.css"></style>

