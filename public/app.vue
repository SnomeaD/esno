<template>
    <div id="app">
        <header class="navbar navbar-expand-sm navbar-dark bg-dark flex-column flex-md-row">
            <div class="container">
                <a href="#" class="navbar-brand">Esno</a>
                <div class="navbar-scroll ">
                    <ul class="navbar-nav flex-row">
                        <li v-for="page in pages" class="nav-item">
                            <router-link class="nav-link" :to="{name:page.routeName}">
                                <i :class="[page.faIcon, 'fa']" tooltip-placement="bottom" :uib-tooltip="page.description"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="no-grow collapse navbar-collapse navbar-nav ml-md-auto d-none d-md-flex">
                    <ul class="navbar-nav flex-row">
                        <li class="nav-item">
                            <a class="nav-link">
                                <i :class="['fa-search', 'fa']" tooltip-placement="bottom" tooltip="Search"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div class="container">
            <!-- Content -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
// Importing Vue and Vue library
import Vue from 'vue';
import VueRouter from 'vue-router';

// Importing style
import 'bootstrap-loader';
import './css/style.less';
import 'font-awesome-webpack';

// Pages
//import toonPage from './pages/toon.vue';
import toonInfo from './components/toonInfo.vue';
const toonPage = () => import(/* webpackChunkName: "toon" */'./pages/toon.vue');



// List of vue addon that we use.
Vue.use(VueRouter);
Vue.component("toon-info", toonInfo);
//Route declaration
const routes = [
    { path: '/toon/:realm/:toonname', name: "toon", component: toonPage },
    { path: '/progress/',name:"progress", component: {/* todo */ } },
    { path: '/guild/',name:"guild", component: {/* todo */ } },
];

const router = new VueRouter({
    routes: routes
});

export default {
    el: "#app",
    router: router,
    data () {
        return {
            pages: [
                {faIcon: "fa-tasks", description: "Progress", routeName: "progress"},
                {faIcon: "fa-list", description: "Guild", routeName: "guild"}
            ]
        }
    },
    components: {
    }
};
</script>

