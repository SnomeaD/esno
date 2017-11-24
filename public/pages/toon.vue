<template>
    <div>
        <h2>Toon page</h2>
        <span>{{$route.params.name}}</span>
        <toon-info v-bind:toon="toon"></toon-info>
    </div>
</template>
<script>
    import toonInfo from '../components/toonInfo.vue';

    export default {
        data () {
            return {
                loading: false,
                post: null,
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
                this.error = this.post = null;
                this.loading = true;
                this.toon = {name: this.$route.params.name};

                // replace `getPost` with your data fetching util / API wrapper
//                getPost(this.$route.params.name, (err, post) => {
//                    this.loading = false;
//                    if (err) {
//                        this.error = err.toString()
//                    } else {
//                        this.post = post;
//                        this.toon = {name: this.$route.params.name};
//                    }
//                })
            }
        },
        components: {
            toonInfo: toonInfo
        }
    }
</script>
