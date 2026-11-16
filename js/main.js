const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
        }
    },
    methods: {
        async getMusicRecords() {
            try {
                const data = await axios.get('pairprogramming-recordsapi-amh6d9fkcpcmhxaq.norwayeast-01.azurewebsites.net');
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
