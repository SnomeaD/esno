import 'bootstrap-loader';
import './css/style.less';
import 'font-awesome-webpack';
import $ from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router';
import toon from './vue/toon.vue';

$(function() {
    Vue.use(VueRouter);
    const Bar = { template: '<div>bar bar</div>' };

    const routes = [
        { path: '/toon', name:'toon', component: toon },
        { path: '/bar', name:'bar', component: Bar }
    ];
    const router = new VueRouter({
        routes: routes
    });

    const app = new Vue({
        router: router,
        el: '#app',
        data: {
            test: [
                {faIcon: "fa-dashboard", description: "Dashboard"},
                {faIcon: "fa-superpowers", description: "Rock them all"}
            ]
        }
    }).$mount('#app');
});
