const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
titleFilter: '',
artistFilter: ''
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
        },
        async filterRecords() {
            try {
                const data = await axios.get('https://localhost:7198/api/musicRecords', {
                    params: {
                        title: this.titleFilter,
                        artist: this.artistFilter
                    }
                });
                this.musicRecords = data.data;
            } catch (error) {
                console.error('Error filtering music records:', error);
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
