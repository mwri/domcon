module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['gruntfile.js', 'lib/*.js'],
            options: {
                esversion: 6,
                '-W083':  true,
				laxbreak: true,
				validthis: true,
            }
        },

        watch: {
            build: {
                options: { spawn: true },
                files: ['gruntfile.js', 'lib/*.js', 'test/*.js'],
                tasks: ['build'],
            },
            test: {
                options: { spawn: true },
                files: ['gruntfile.js', 'lib/*.js', 'test/*.js'],
                tasks: ['test'],
            },
        },

        eslint: {
            target: ['lib'],
        },

        karma: {
            test: {
                options: {
                    files: [
                        'node_modules/jquery/dist/jquery.min.js',
                        'dist/domcon.js',
                        'test/*.js',
                    ],
                    basePath:    '',
                    urlRoot:     '/',
                    frameworks:  ['jasmine'],
                    port:        9876,
                    colors:      true,
                    autoWatch:   false,
                    interval:    200,
                    singleRun:   true,
                    browsers:    ['ChromeHeadless'],
                    reporters:   ['spec'],
                    concurrency: Infinity,
                },
            },
            build: {
                options: {
                    files: [
                        'node_modules/jquery/dist/jquery.min.js',
                        'dist/domcon.js',
                        'test/*.js',
                    ],
                    basePath:    '',
                    urlRoot:     '/',
                    frameworks:  ['jasmine'],
                    port:        9876,
                    colors:      true,
                    autoWatch:   false,
                    interval:    200,
                    singleRun:   true,
                    browsers:    ['ChromeHeadless'],
                    reporters:   ['spec', 'coverage'],
                    preprocessors: { 'dist/domcon.js': ['coverage'] },
                    concurrency: Infinity,
                    coverageReporter: {
                        reporters: [
                            { type : 'lcov', subdir: 'karma/' },
                            { type : 'text' },
                        ],
                    },
                },
            },
            travis_ci: {
                options: {
                    files: [
                        'node_modules/jquery/dist/jquery.min.js',
                        'dist/domcon.js',
                        'test/*.js',
                    ],
                    basePath:      '',
                    urlRoot:       '/',
                    frameworks:    ['jasmine'],
                    port:          9876,
                    colors:        true,
                    autoWatch:     false,
                    interval:      200,
                    singleRun:     true,
                    browsers:      ['ChromeHeadlessNoSandbox'],
                    reporters:     ['spec', 'coverage'],
                    preprocessors: { 'dist/domcon.js': ['coverage'] },
                    concurrency:   Infinity,
                    customLaunchers: {
                        ChromeHeadlessNoSandbox: {
                            base:  'ChromeHeadless',
                            flags: ['--no-sandbox']
                        },
                    },
                    coverageReporter: {
                        reporters: [
                            { type : 'lcov', subdir: 'karma/' },
                            { type : 'text' },
                        ],
                    },
                },
            },
        },

        babel: {
            dist: {
                files: {
                    'dist/<%=pkg.name%>.js': 'lib/<%=pkg.name%>.js',
                },
            },
        },

        clean: [
            'node_modules',
        ],

        gitstatus: {
            publish: {
                options: {
                    callback: function (r) {
                        if (r.length > 0)
                            throw new Error('git status unclean');
                    },
                },
            },
        },

    });

    grunt.registerTask('test', [
        'jshint',
        'eslint',
        'babel',
        'karma:test',
    ]);

    grunt.registerTask('build', [
        'jshint',
        'eslint',
        'babel',
        'karma:build',
    ]);

    grunt.registerTask('travis_ci_build', [
        'jshint',
        'eslint',
        'babel',
        'karma:travis_ci',
    ]);

    grunt.registerTask('prepublish', [
        'clean',
        'gitstatus:publish',
    ]);

};
