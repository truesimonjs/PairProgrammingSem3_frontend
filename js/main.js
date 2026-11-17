const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
title: '',
artist: '',
duration: 0,
publicationYear: 0
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
        },
        async addMusicRecord() {
            try {
                const record = {
                    title: this.title,
                    artist: this.artist,
                    duration: this.duration,
                    publicationYear: this.publicationYear
                };
                const response = await axios.post('https://pairprogramming-f6bvctbratcfexdp.spaincentral-01.azurewebsites.net/api/musicRecords', record);
                this.musicRecords.push(response.data);
                this.title = '';
                this.artist = '';
                this.duration = 0;
                this.publicationYear = 0;
            } catch (error) {
                console.error('Error adding music record:', error);
            }
        },
        async deleteMusicRecord(id) {
          try {
            const response = await axios.delete(`https://pairprogramming-f6bvctbratcfexdp.spaincentral-01.azurewebsites.net/api/musicRecords/${id}`)
            this.musicRecords = this.musicRecords.filter(record => record.id !== response.data.id);
          } catch (error) {
            console.error('Error deleting music record:', error);
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
