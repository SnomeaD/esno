'use strict';

const configDev = require('../webpack.dev');
const configProd = require('../webpack.prod');

module.exports = function webpack(grunt) {

    grunt.loadNpmTasks('grunt-webpack');
    //console.log(process.env.NODE_ENV);

    return {prod:configProd, dev:configDev};
};
