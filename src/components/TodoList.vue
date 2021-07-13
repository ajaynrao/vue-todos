<template>
  <div id="todos" v-loading.fullscreen="loading">
    <div class="clearfix">
      <h3 class="py-4 float-left">Todo List</h3>
      <button
        type="button"
        class="btn btn-primary float-right my-4"
        @click="dialog2Visible = true"
      >
        Add Todo
      </button>
    </div>
    <div v-if="todos == null">You do not have any todos yet</div>
    <div v-for="(todo, key) in todos" :key="key">
      <ul class="todo-list">
        <li class="shadow-sm">
          {{ todo.text }}
          <span class="todo-actions float-right">
            <i class="el-icon-view px-1" @click="showDetails(todo)"></i>
            <i class="el-icon-delete px-1" @click="delTodo(key)"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
  <el-dialog :title="viewTodo.text" v-model="dialogVisible" width="30%">
    <p>{{ viewTodo.description }}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </template>
  </el-dialog>
  <form @submit.prevent="addTodo">
    <el-dialog title="Add Todo" v-model="dialog2Visible" width="30%">
      <div class="form-group">
        <input
          class="form-control"
          v-model="todo.text"
          placeholder="Title"
          required
        />
      </div>
      <div class="form-group">
        <textarea
          class="form-control"
          v-model="todo.description"
          placeholder="Description"
          rows="5"
          required
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog2Visible = false" plain
            >Close</el-button
          >
          <el-button type="success" native-type="submit">Add</el-button>
        </span>
      </template>
    </el-dialog>
  </form>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import { getUserTodos } from "../composables/getUserTodos";
import { Todos } from "../api/todos";
import Store from "../store";
export default {
  name: "TodoList",
  props: ["user"],
  data() {
    return {
      todo: {
        text: "",
        uid: this.uid,
        description: "",
      },
      viewTodo: {},
      dialogVisible: false,
      dialog2Visible: false,
    };
  },
  setup(props) {
    let loading = ref(true);
    const { user } = toRefs(props);
    const { todos, getTodos } = getUserTodos(user);
    return {
      todos,
      getTodos,
      loading,
    };
  },
  methods: {
    addTodo(e) {
      if (this.todo) {
        this.todo.uid = this.uid;
        Todos.addTodo(this.todo).then((res) => {
          this.todo.text = "";
          this.todo.description = "";
          console.log("added todo");
          this.dialog2Visible = false;
          this.$message({
          message: "Todo has been added",
          type: "success",
          offset: 50
        });
        });
      }
    },
    showDetails(todo) {
      this.viewTodo = todo;
      this.dialogVisible = true;
    },
    delTodo(rmkey) {
      Todos.removeTodo(rmkey).then((res) => {
        console.log("removed todo");
        this.$message({
          message: "Todo has been deleted",
          type: "success",
          offset: 50
        });
      });
    },
  },
  computed: {
    uid() {
      if (Store.state.user) {
        return Store.state.user.uid;
      } else {
        return this.uid;
      }
    },
  },
  watch: {
    todos() {
      if (this.todos || this.todos == null) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding-left: 0;
}
.todo-list li {
  padding: 15px;
  margin: 15px;
  border: 0.5px solid rgb(0, 0, 0, 0.1);
  border-radius: 10px;
}
i {
  line-height: 24px;
  cursor: pointer;
}
</style>