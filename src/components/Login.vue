<template>
  <div
    class="
      container
      d-flex
      flex-column
      justify-content-center
      align-items-center
    "
  >
    <!-- <p>User: {{user}}</p> -->
    <div class="login-container shadow p-4 my-5 rounded">
      <div class="btn-group">
        <button class="btn btn-primary" @click="activeTab = 'login'">
          Login
        </button>
        <button class="btn btn-primary" @click="activeTab = 'register'">
          Register
        </button>
      </div>
      <div v-if="activeTab === 'login'">
        <h3 class="py-3">Login</h3>
        <form @submit.prevent="LoginUser">
          <div class="form-group mt-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              v-model.trim="loginForm.email"
              required
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              v-model.trim="loginForm.password"
              required
            />
          </div>
          <div class="form-group mt-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <div v-if="lapiResponse" :class="errColor" class="py-2">
          {{ lapiResponse }}
        </div>
      </div>
      <div v-else>
        <h3 class="py-3">Register</h3>
        <form @submit.prevent="createUser">
          <div class="form-group mt-2">
            <input
              type="text"
              class="form-control"
              placeholder="First Name"
              v-model="registerForm.first_name"
              required
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="text"
              class="form-control"
              placeholder="Last Name"
              v-model="registerForm.last_name"
              required
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="registerForm.email"
              required
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="registerForm.password"
              required
            />
          </div>
          <div class="form-group mt-3">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
        <div v-if="rapiResponse" :class="errColor" class="py-2">
          {{ rapiResponse }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "../api/users";
import Store from "../store";
export default {
  name: "Login",
  data() {
    return {
      errColor: "",
      activeTab: "login",
      lapiResponse: "",
      rapiResponse: "",
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    user() {
      return Store.state.user;
    },
  },
  watch: {
    user(user, ouser) {
      if (user) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    LoginUser() {
      this.lapiResponse = "Please wait...";
      Users.login(this.loginForm)
        .then((res) => {
          console.log(res);
          this.lapiResponse = "Login Successul";
          this.$message({
            message: this.lapiResponse,
            type: "success",
            offset: 50,
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.lapiResponse = err.message;
          this.$message({
            message: this.lapiResponse,
            type: "error",
            offset: 50,
          });
        });
    },
    createUser() {
      this.rapiResponse = "Please wait...";
      Users.register(this.registerForm)
        .then((res) => {
          console.log(res);
          this.rapiResponse = "Registration Successul, you may now login";
          this.$message({
            message: this.rapiResponse,
            type: "success",
            offset: 50,
          });
        })
        .catch((err) => {
          console.log(err);
          this.rapiResponse = err.message;
          this.$message({
            message: this.rapiResponse,
            type: "error",
            offset: 50,
          });
        });
    },
  },
  mounted() {
    console.log("current user", this.user);
  },
};
</script>

<style scoped>
.login-container {
  width: 35%;
  text-align: center;
}
.container {
  padding-top: 120px;
}
@media only screen and (max-width: 768px) {
  .login-container {
    width: 90%;
  }
}
</style>