import 'bootstrap-loader';
import './css/style.less';
import 'font-awesome-webpack';
import $ from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router';
import toonPage from './pages/toon.vue';
$(function() {
    Vue.use(VueRouter);
    const Bar = { template: '<div>bar bar</div>' };

    const routes = [
        { path: '/toon/:server/:name', component: toonPage },
        { path: '/bar', name:'bar', component: Bar }
    ];
    const router = new VueRouter({
        routes: routes
    });

    const app = new Vue({
        router: router,
        el: '#app',
        data: {
        }
    }).$mount('#app');
});
