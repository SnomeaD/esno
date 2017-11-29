<template>
    <div class="post">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="toon" class="content">
            <h2>{{ toon.name }}</h2>
            <p>{{ toon.artifactTrait }}</p>
        </div>

        <h2>Toon page</h2>
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
            battlenet.getToon(this.$route.params.server, this.$route.params.name)
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
