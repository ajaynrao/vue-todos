<template>
  <div class="main-page container">
    <todo-list :user="user"/>
  </div>
</template>

<script>

import Store from '../store'
import TodoList from './TodoList.vue';
export default {
  components: { TodoList },
  name: "HomePage",
  props: ['isLoggedIn'],
  computed: {
    user() {
      return Store.state.user
    }
  }
};
</script>

<style scoped>
</style>