
const apiAPP = Vue.createApp({
    el: '#apiAPP',
    data () {
      return {
        info: null,
        filtered:false,
        completeList: null,
        listOfColleges: [],
        playerCount: 0
      }
    },
    mounted () {
            axios
            .get('http://data.nba.net/10s/prod/v1/2020/players.json')
            .then(response => {
                    this.info = response.data.league.standard;
                    this.BuildCollegeList();
                    this.playerCount = this.info.length

                    
            })
        },
        methods: {
            filterCountry(){
            if(this.filtered===false)
            {
                this.info = this.info.filter(x=> x.country ==='USA')
                this.filtered=true
            }
            else
            {
              
                this.info = this.completeList
                this.filtered=false
            }
            this.playerCount = this.info.length
        },
        BuildCollegeList()
        {
            for (i = 0; i < this.info.length; i++) {
               var isFound = false; 
                for (x = 0; x < this.listOfColleges.length; x++) {
                    if(this.info[i].collegeName===this.listOfColleges[x])
                    {
                        isFound=true;
                    }
                }
                    if(isFound === false)
                    {
                        this.listOfColleges.push(this.info[i].collegeName)
                    }
                
              }
              this.listOfColleges.sort()
              this.completeList= this.info 
        },
        FilterCollege(collegeName)
        {
            
                this.info = this.completeList
                this.info = this.info.filter(x=> x.collegeName ===collegeName.target.options[collegeName.target.options.selectedIndex].text)
                this.filtered=true
                this.playerCount = this.info.length

        }
    }
  })

apiAPP.mount('#apiAPP')