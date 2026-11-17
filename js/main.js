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
        this.getAllError =
          error.response.data.message ||
          "Failed to fetch music records. Please try again.";
      }
    },
    async login() {
      try {
        const data = await axios.post("https://pairprogramming-f6bvctbratcfexdp.spaincentral-01.azurewebsites.net/api/Auth/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", data.data.token);
        document.location.reload();
      } catch (error) {
        console.error("Error logging in:", error);
        this.loginError =
          error.response.data.message || "Login failed. Please try again.";
      }
    },
    async addMusicRecord() {
      try {
        const record = {
          title: this.title,
          artist: this.artist,
          duration: this.duration,
          publicationYear: this.publicationYear,
        };
        const response = await axios.post(
          "https://pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net",
          record,
        );
        this.musicRecords.push(response.data);
        this.title = "";
        this.artist = "";
        this.duration = 0;
        this.publicationYear = 0;
      } catch (error) {
        console.error("Error adding music record:", error);
      }
    },
    async deleteMusicRecord(id) {
      try {
        const response = await axios.delete(
          `https://pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net/${id}`,
        );
        this.musicRecords = this.musicRecords.filter(
          (record) => record.id !== response.data.id,
        );
      } catch (error) {
        console.error("Error deleting music record:", error);
      }
    },
    async filterRecords() {
      try {
        const data = await axios.get(
          "https://pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net/api/musicRecords",
          {
            params: {
              title: this.titleFilter,
              artist: this.artistFilter,
            },
          },
        );
        this.musicRecords = data.data;
      } catch (error) {
        console.error("Error filtering music records:", error);
      }
    },
    logout() {
      localStorage.removeItem("token");
      document.location.reload();
    },
    checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      } else return true;
    },
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
