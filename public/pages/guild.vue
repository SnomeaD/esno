<template>
    <div class="container">
        <h2>Les Sapins de la Horde</h2>
        <div class="loading" v-if="loading">
            <i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"/>
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <div v-if="toons">
            <guild-toon :toons="toons"/>
        </div>
    </div>
</template>
<script>
import battlenet from '../services/battlenet.js';
import guildToon from '../components/guildToon.vue';
export default {
    components: {
        guildToon
    },
    data () {
        return {
            loading: false,
            error: null,
            toons: []
        };
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    methods: {
        fetchData () {
            this.error = null;
            this.loading = true;
            battlenet.getGuildToons('sargeras', 'Les Sapins de la Horde')
                .then(data => {
                    data.members.forEach(member => {
                        if (member.rank <= 3 || member.rank === 8) {
                            battlenet.getToon(member.character.realm, member.character.name)
                                .then(toonInfo => {
                                    this.toons.push(toonInfo);
                                    this.loading = false;
                                }).catch(error => {
                                    this.error = error;
                                });
                        }
                    });
                }).catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
