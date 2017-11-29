<template>
    <div>
        <router-link to="/toon">Go to toon</router-link>
        <router-link to="/bar">Go to bar</router-link>

        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

// App import
import toonPage from './pages/toon.vue';
import toonInfo from './components/toonInfo.vue';
//const toonPage = () => import(/* webpackChunkName: "toon" */'./pages/toon.vue');



// List of vue addon that we use.
Vue.use(VueRouter);
Vue.component("toon-info", toonInfo);

//Route declaration
const routes = [
    { path: '/toon/:server/:name', component: toonPage },
    { path: '/progress/', component: {/* todo */ } },
];

const router = new VueRouter({
    routes: routes
});

export default {
    el: "#app",
    router: router,
    data () {
        return {}
    },
    components: {
    }
};
</script>

