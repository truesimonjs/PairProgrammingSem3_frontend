app.component("create-record-form", {
  data() {
    return {
      record: {
        title: "",
        artist: "",
        duration: 0,
        publicationYear: 0,
      },
      createError: "",
    };
  },
  methods: {
    async addMusicRecord() {
      this.createError = "";
      try {
        const response = await axios.post(
          `${API_CONFIG.baseUrl}/api/musicRecords`,
          this.record,
        );
        this.$emit("record-created", response.data);
        this.record = {
          title: "",
          artist: "",
          duration: 0,
          publicationYear: 0,
        };
      } catch (error) {
        console.error("Error adding music record:", error);
        this.createError =
          error.response?.data?.message ||
          "Failed to add music record. Please try again.";
      }
    },
  },
  template: `
    <form class="card card-body mt-4" @submit.prevent="addMusicRecord">
      <h3 class="h5 mb-3">Add a record</h3>
      <div v-if="createError" class="alert alert-danger" role="alert">{{ createError }}</div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="record-title">Title</label>
          <input id="record-title" class="form-control" required type="text" v-model="record.title" placeholder="Enter title" />
        </div>
        <div class="form-group col-md-6">
          <label for="record-artist">Artist</label>
          <input id="record-artist" class="form-control" required type="text" v-model="record.artist" placeholder="Enter artist" />
        </div>
        <div class="form-group col-md-6">
          <label for="record-duration">Duration</label>
          <input id="record-duration" class="form-control" required type="number" v-model.number="record.duration" placeholder="Duration in minutes" />
        </div>
        <div class="form-group col-md-6">
          <label for="record-publication-year">Publication year</label>
          <input id="record-publication-year" class="form-control" required type="number" v-model.number="record.publicationYear" placeholder="Year released" />
        </div>
      </div>
      <div><button type="submit" class="btn btn-primary">Add Record</button></div>
    </form>
  `,
});
