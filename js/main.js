var API_CONFIG = {
  baseUrl:
    "https://pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net",
};

var app = Vue.createApp({
  data() {
    return {
      authenticated: Boolean(localStorage.getItem("token")),
    };
  },
});
