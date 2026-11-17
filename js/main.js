const app = Vue.createApp({
    data() {
        return {
musicRecords: [],
title: '',
artist: '',
duration: 0,
publicationYear: 0
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
