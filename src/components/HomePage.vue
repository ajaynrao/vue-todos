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
  },
  mounted() {
    if((localStorage.getItem('user') == "null") || (localStorage.getItem('user') == undefined)) {
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
</style>