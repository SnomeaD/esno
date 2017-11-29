// Importing style
import 'bootstrap-loader';
import './css/style.less';
import 'font-awesome-webpack';

// Importing external lib
import $ from 'jquery';
import Vue from 'vue';

// App import
import app from './app.vue'

//Main app.
$(function() {
    let main = new Vue(app);
});
