const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
        }
    },
    methods: {
        async getMusicRecords() {
            try {
                const data = await axios.get('https://localhost:7198/api/MusicRecords');
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
