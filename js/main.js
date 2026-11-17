var API_CONFIG = {
  baseUrl:
    "https://localhost:7198",
};

var app = Vue.createApp({
  data() {
    return {
      authenticated: Boolean(localStorage.getItem("token")),
    };
  },
});
