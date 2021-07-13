<template>
  <header id="site-header">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
      <a class="navbar-brand" v-if="user" href="/">
        <img :src="user.photoURL" width="40" class="px-2" />
        {{ user.email }}
      </a>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!user">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="user">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Users from "../api/users";
export default {
  name: "Header",
  props: {
    user: {
      required: true,
    },
  },
  methods: {
    logout() {
      Users.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>