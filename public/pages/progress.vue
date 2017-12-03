<template>
    <div class="container">
        <div class="loading" v-if="loading">
            <i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="toons">
            <progress-toon :toons="toons"></progress-toon>
        </div>
    </div>
</template>
<script>
import battlenet from '../services/battlenet.js';
import moment from 'moment';
import progressToon from '../components/progressToon.vue';

export default {
    components:{
        progressToon
    },
    data () {
        return {
            loading: false,
            error: null,
            toons:[],
            toonsList: [
                {server:'sargeras', name:'Snomead'},
                {server:'sargeras', name:'Snominette'},
                {server:'sargeras', name:'Sno'},
                {server:'sargeras', name:'Snômead'},
                {server:'sargeras', name:'Snomeadine'},
                {server:'nerzhul',  name:'Snomead'},
                {server:'sargeras', name:'Snoméàd'},
                {server:'sargeras', name:'Dromead'},
                {server:'sargeras', name:'Snomeadée'},
                {server:'sargeras', name:'Snømead'},
                {server:'sargeras', name:'Snomeadille'},
                {server:'sargeras', name:'Snommead'},
                {server:'sargeras', name:'Snomeadh'},
                {server:'garona',   name:'Snomead'}
            ]
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        getSummary(raidData){
            let response = {
                'numberOfBosses': raidData.bosses.length,
                'lfr': {
                    'kill':0,
                },
                'normal': {
                    'kill':0,
                },
                'heroic': {
                    'kill':0,
                },
                'mythic': {
                    'kill':0,
                }
            };
            for(let bossId in raidData.bosses) {
                if(this.isDeadThisWeek(raidData.bosses[bossId].lfrTimestamp)){
                    response.lfr.kill += 1;
                    raidData.bosses[bossId].lfrDeadThisWeek = true;
                }
                if(this.isDeadThisWeek(raidData.bosses[bossId].normalTimestamp)){
                    response.normal.kill += 1;
                    raidData.bosses[bossId].normalDeadThisWeek = true;
                }
                if(this.isDeadThisWeek(raidData.bosses[bossId].heroicTimestamp)){
                    response.heroic.kill += 1;
                    raidData.bosses[bossId].heroicDeadThisWeek = true;
                }
                if(this.isDeadThisWeek(raidData.bosses[bossId].mythicTimestamp)){
                    response.mythic.kill += 1;
                    raidData.bosses[bossId].mythicDeadThisWeek = true;
                }
            }
            response.lfr.status =  this.defineStatus(response.lfr.kill,response.numberOfBosses);
            response.normal.status =  this.defineStatus(response.normal.kill,response.numberOfBosses);
            response.heroic.status =  this.defineStatus(response.heroic.kill,response.numberOfBosses);
            response.mythic.status =  this.defineStatus(response.mythic.kill,response.numberOfBosses);
            return response;
        },
        isDeadThisWeek(timestamp){
            // If we are Wednesday or past, don't take last wednesday but this Wednesday
            if(3 <= moment().day()){
                return moment(timestamp).isAfter(moment().day(3).hour(9).minute(0).second(0));
            }else{
                if(moment(timestamp).isAfter(moment().day(-4).hour(9).minute(0).second(0))){
                    return true;
                }
            }
            return false;
        },
        findById(id){
            return function findId(array){
                return array.id===id;
            }
        },
        defineStatus(kill,total) {
            if(kill === total){
                return "status-completed";
            }else if(kill === 0){
                return "status-incomplete";
            }else{
                return "status-in-progress";
            }
        },
        fetchData () {
            this.error = null;
            this.loading = true;
            this.toonsList.forEach( function (toon){
                battlenet.getProgress(toon.server,toon.name)
                    .then(data => {
                        let toon = {
                            'name' : data.name,
                            'realm' : data.realm,
                            'staticThumbnail' : 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + data.thumbnail,
                            'thumbnail' : 'http://render-eu.worldofwarcraft.com/character/' + data.thumbnail,
                            'class': data.class,
                            'averageItemLevel': data.items.averageItemLevel,
                            'averageItemLevelEquipped': data.items.averageItemLevelEquipped,
                        };
                        toon.progress = [];
                        let raids = [8026,8440,8025,8524,8638];
                        for(let i =0; i< raids.length;i++){
                            const theRaid = this.findById(raids[i]);
                            const raid = data.progression.raids.find(theRaid);
                            const theBoss = this.findById(raids[i]);
                            raid.summary = this.getSummary(data.progression.raids.find(theBoss));
                            toon.progress.push(raid);
                        }
                        this.toons.push(toon);
                        this.loading=false;
                    }).catch(error => {
                        console.log(error);
                        this.loading = false;
                        this.error = error;
                });
            }.bind(this));
        }
    }
}
</script>
