'use strict';

module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    // App tasks
    grunt.registerTask('build', [ 'jshint', 'less', 'webpack' ]);
    grunt.registerTask('test', [ 'jshint' ]);
    grunt.registerTask('lint', [ 'jshint' ]);

    // Build tasks
    grunt.loadNpmTasks('grunt-ci-suite');

};
