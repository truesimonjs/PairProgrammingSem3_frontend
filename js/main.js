const app = Vue.createApp({
  data() {
    return {
      musicRecords: [],
      username: "",
      password: "",
      loginError: "",
      getAllError: "",
    };
  },
  methods: {
    async getMusicRecords() {
      try {
        const data = await axios.get(
          "https://pairprogramming-f6bvctbratcfexdp.spaincentral-01.azurewebsites.net/api/musicRecords",
        );
        this.musicRecords = data.data;
      } catch (error) {
        console.error("Error fetching music records:", error);
        this.getAllError = error.response.data.message || "Failed to fetch music records. Please try again.";
      }
    },
    async login() {
      try {
        const data = await axios.post("https://localhost:7198/api/Auth/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", data.data.token);
        document.location.reload();        
      } catch (error) {
        console.error("Error logging in:", error);
        this.loginError = error.response.data.message || "Login failed. Please try again.";
      }
    },
    logout() {
      localStorage.removeItem("token");
      document.location.reload();        
    },
    checkToken() {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            return false;
        } else return true;
    }
  },
  computed: {
    myComputed() {
      return "";
    },
  },
  mounted() {
    this.getMusicRecords();
  },
});
