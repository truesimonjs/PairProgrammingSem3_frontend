app.component("app-navbar", {
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["authenticated-change"],
  data() {
    return {
      username: localStorage.getItem("username") || "",
      password: "",
      loginError: "",
    };
  },
  methods: {
    async login() {
      this.loginError = "";
      try {
        const response = await axios.post(
          `${API_CONFIG.baseUrl}/api/Auth/login`,
          {
            username: this.username,
            password: this.password,
          },
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", this.username);
        this.$emit("authenticated-change", true);
        this.password = "";
      } catch (error) {
        console.error("Error logging in:", error);
        this.loginError =
          error.response?.data?.message || "Login failed. Please try again.";
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.username = "";
      this.password = "";
      this.$emit("authenticated-change", false);
    },
  },
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">Music Records</span>
      <div v-if="!authenticated" class="ml-auto">
        <div v-if="loginError" class="small text-warning text-right mb-1">{{ loginError }}</div>
        <form @submit.prevent="login" class="form-inline">
          <input v-model="username" class="form-control form-control-sm mr-sm-2 mb-2 mb-sm-0" placeholder="Username" aria-label="Username" autocomplete="username" />
          <input v-model="password" class="form-control form-control-sm mr-sm-2 mb-2 mb-sm-0" type="password" placeholder="Password" aria-label="Password" autocomplete="current-password" />
          <button type="submit" class="btn btn-primary btn-sm">Login</button>
        </form>
      </div>
      <div v-else>
        <span class="text-light mr-2">{{ username }}</span>
        <button @click="logout" class="btn btn-outline-light">Logout</button>
      </div>
    </nav>
  `,
});
