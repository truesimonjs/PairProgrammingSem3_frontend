app.component("record-list", {
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      musicRecords: [],
      getAllError: "",
    };
  },
  methods: {
    async getMusicRecords() {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseUrl}/api/musicRecords`,
        );
        this.musicRecords = response.data;
      } catch (error) {
        console.error("Error fetching music records:", error);
        this.getAllError =
          error.response?.data?.message ||
          "Failed to fetch music records. Please try again.";
      }
    },
    setMusicRecords(records) {
      this.musicRecords = records;
      this.getAllError = "";
    },
    addMusicRecord(record) {
      this.musicRecords.push(record);
    },
    removeMusicRecord(id) {
      this.musicRecords = this.musicRecords.filter((record) => record.id !== id);
    },
  },
  mounted() {
    this.getMusicRecords();
  },
  template: `
    <main class="container py-4">
      <header class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1">Your collection</h2>
          <p class="text-muted mb-0">Browse and manage your music records.</p>
        </div>
        <span class="badge badge-primary badge-pill px-3 py-2">
          {{ musicRecords.length }} {{ musicRecords.length === 1 ? "record" : "records" }}
        </span>
      </header>

      <section class="card mb-4">
        <div class="card-body">
          <record-filter @records-filtered="setMusicRecords"></record-filter>
        </div>
      </section>

      <div v-if="getAllError" class="alert alert-danger" role="alert">{{ getAllError }}</div>
      <div
        v-if="musicRecords.length === 0 && !getAllError"
        class="alert alert-info text-center py-4"
        role="status"
      >
        <h3 class="h5">No music records found</h3>
        <p class="mb-0">Try changing your filters or add a record to your collection.</p>
      </div>

      <div v-else-if="musicRecords.length > 0" class="row">
        <div
          v-for="record in musicRecords"
          :key="record.id"
          class="col-12 col-md-6 col-lg-4 mb-3"
        >
          <article class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <h3 class="card-title h5">{{ record.title }}</h3>
                <delete-record-button
                  v-if="authenticated"
                  :record-id="record.id"
                  @deleted="removeMusicRecord"
                />
              </div>
              <p class="card-text text-muted">by {{ record.artist }}</p>
              <div>
                <span v-if="record.publicationYear" class="badge badge-light mr-2">
                  {{ record.publicationYear }}
                </span>
                <span v-if="record.durationInSeconds != null" class="badge badge-light">
                  {{ record.durationInSeconds }} sec
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <create-record-form
        v-if="authenticated"
        @record-created="addMusicRecord"
      ></create-record-form>
    </main>
  `,
});
