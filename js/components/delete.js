app.component("delete-record-button", {
  props: {
    recordId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      deleteError: "",
    };
  },
  methods: {
    async deleteRecord() {
      this.deleteError = "";
      try {
        await axios.delete(
          `${API_CONFIG.baseUrl}/api/musicRecords/${this.recordId}`,
        );
        this.$emit("deleted", this.recordId);
      } catch (error) {
        console.error("Error deleting music record:", error);
        this.deleteError =
          error.response?.data?.message ||
          "Failed to delete music record. Please try again.";
      }
    },
  },
  template: `
    <span class="float-right">
      <span v-if="deleteError" class="text-danger mr-2">{{ deleteError }}</span>
      <button class="btn btn-outline-danger btn-sm" @click="deleteRecord">Delete</button>
    </span>
  `,
});
