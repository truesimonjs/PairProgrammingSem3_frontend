const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
        }
    },
    methods: {
        async getMusicRecords() {
            try {
                const data = await axios.get('https://pairprogramming-f6bvctbratcfexdp.spaincentral-01.azurewebsites.net/api/musicRecords');
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
