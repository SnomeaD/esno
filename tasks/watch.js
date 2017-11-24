'use strict';

module.exports = function watch(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    return {
        webpack: {
            files: ['public/**/*.js', 'public/**/*.css', 'public/**/*.less','public/**/*.vue'],
            tasks: ['webpack:dev']
        }
    };
};
