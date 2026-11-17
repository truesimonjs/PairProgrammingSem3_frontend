app.component("record-filter", {
  data() {
    return {
      title: "",
      artist: "",
      filterError: "",
    };
  },
  methods: {
    async filterRecords() {
      this.filterError = "";
      try {
        const response = await axios.get(
          `${API_CONFIG.baseUrl}/api/musicRecords`,
          {
            params: {
              title: this.title,
              artist: this.artist,
            },
          },
        );
        this.$emit("records-filtered", response.data);
      } catch (error) {
        console.error("Error filtering music records:", error);
        this.filterError =
          error.response?.data?.message ||
          "Failed to filter music records. Please try again.";
      }
    },
  },
  template: `
    <form class="mb-3" @submit.prevent="filterRecords">
      <div v-if="filterError" class="alert alert-danger" role="alert">{{ filterError }}</div>
      <input v-model="title" type="text" placeholder="Title" class="form-control mb-2" />
      <input v-model="artist" type="text" placeholder="Artist" class="form-control mb-2" />
      <button type="submit" class="btn btn-primary">Filter</button>
    </form>
  `,
});
