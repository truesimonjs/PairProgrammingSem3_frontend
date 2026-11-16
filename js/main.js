const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
        }
    },
    methods: {
        async getMusicRecords() {
            try {
                // Fetch music records from the API
                const data = await axios.get('https://pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net/api/musicRecords');
                this.musicRecords = data.data;
            } catch (error) {
                console.error('Error fetching music records:', error);
            }
        }
    },  
    computed: {
        myComputed() {
            return ''
        },
        
    },
    mounted() {
        this.getMusicRecords();
    }
})
