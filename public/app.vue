<template>
    <div>
        <header class="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row bd-navbar">
            <a href="#" class="navbar-brand">Esno</a>
            <div class="navbar-nav-scroll">
                <div class="navbar-scroll ">
                    <ul class="navbar-nav flex-row">
                        <li
                            v-for="(page, index) in pages"
                            :key="index"
                            class="nav-item"
                        >
                            <router-link class="nav-link" :to="{name:page.routeName}">
                                <i
                                    :class="[page.faIcon, 'fa']"
                                    tooltip-placement="bottom"
                                    :uib-tooltip="page.description"
                                />
                                {{ page.description }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li class="nav-item">
                    <a class="nav-link">
                        <i
                            :class="['fa-search', 'fa']"
                            tooltip-placement="bottom"
                            tooltip="Search"
                        />
                    </a>
                </li>
            </ul>
        </header>
        <div class="container content">
            <!-- Content -->
            <router-view/>
        </div>
        <div class="container">
            <div class="footer">
                <hr class="footer-hr" >
                <p>&copy;&nbsp;<a href="#">SnomeaD</a> | 2016-2018</p>
            </div>
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
import toonInfo from './components/toonInfo.vue';
const toonPage = () => import(/* webpackChunkName: "toon" */'./pages/toon.vue');
const progressPage = () => import(/* webpackChunkName: "progress" */'./pages/progress.vue');
const guildPage = () => import(/* webpackChunkName: "guild" */'./pages/guild.vue');

// List of vue addon that we use.
Vue.use(VueRouter);
Vue.component('toon-info', toonInfo);
// Route declaration
const routes = [
    { path: '/toon/:realm/:toonname', name: 'toon', component: toonPage },
    { path: '/progress/', name: 'progress', component: progressPage },
    { path: '/guild/', name: 'guild', component: guildPage }
];

const router = new VueRouter({
    routes: routes
});

export default {
    el: '#app',
    router: router,
    data () {
        return {
            pages: [
                {faIcon: 'fa-tasks', description: 'Progress', routeName: 'progress'},
                {faIcon: 'fa-list', description: 'Guild', routeName: 'guild'}
            ]
        };
    }
};
</script>
<style scoped>
.content{
    margin-top:8px;
}
.footer-hr{
    margin: 30px 0 10px 0;
}
</style>
