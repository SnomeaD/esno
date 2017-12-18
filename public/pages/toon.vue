<template>
    <div class="container">
        <div class="loading" v-if="loading">
            <i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <toon-info v-if="toon" :toon="toon"></toon-info>
    </div>
</template>
<script>
import battlenet from '../services/battlenet.js';
export default {
    data () {
        return {
            loading: false,
            error: null,
            toon:null
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
        fetchData () {
            this.error = null;
            this.loading = true;
            battlenet.getToon(this.$route.params.realm, this.$route.params.toonname)
                .then(toon => {
                    this.loading = false;
                    this.toon = toon;
                }).catch(error => {
                    this.error = error;
            })
        }
    }
}
</script>
