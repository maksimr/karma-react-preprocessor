module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkgFile: 'package.json',
        files: [
            'index.jsx'
        ],
        simplemocha: {
            options: {
                ui: 'bdd',
                reporter: 'dot'
            },
            unit: {
                src: [
                    'test/unit/**/*.js'
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: ['index.js']
            }
        },
        'npm-contributors': {
            options: {
                commitMessage: 'chore: update contributors'
            }
        },
        bump: {
            options: {
                commitMessage: 'chore: release v%VERSION%',
                pushTo: 'origin'
            }
        },
        'auto-release': {
            options: {
                checkTravisBuild: true
            }
        },
        watch: {
            scripts: {
                files: ['index.js', 'test/**/*.js'],
                tasks: ['test']
            }
        }
    });

    grunt.registerTask('release', 'Bump the version and publish to NPM.', function(type) {
        return grunt.task.run(['npm-contributors', "bump:" + (type || 'patch'), 'npm-publish']);
    });
    grunt.registerTask('test', ['jshint', 'simplemocha:unit']);
    grunt.registerTask('default', ['jshint', 'test']);
};
