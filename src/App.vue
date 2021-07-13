<template>
  <Header :user="user"/>
  <router-view />
</template>

<script>
import Header from './components/Header.vue'
import Store from './store'
export default {
  components: { Header },
  name: 'App',
  computed: {
    user() {
      return Store.state.user
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
