'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', [ 'jshint:dev', 'build:dev' ]);
  grunt.registerTask('default', ['build']);

  grunt.initConfig({
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx$/,
              loader: 'jsx-loader'
            }
          ]
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      },
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    jshint: {
      dev: {
        src: ['Gruntfile.js', '*.js', 'test/*.js', 'models/*.js', 'routes/*.js', 'app/**/*.js', 'lib/', 'test/**/test_entry.js', 'test/**/simple_test.js', 'test/**/notes_controller_test.js']
      },
      options: {
        "node": true,

          "globals": {
          "describe": true,
          "it": true,
          "before": true,
          "after": true,
          "beforeEach": true,
          "afterEach": true,
          "angular": true,
          "expect": true
          }
      }
    },

    simplemocha: {
      unit_tests: {
        src: ['test/*.js']
      }
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js', '*.js', 'test/*.js', 'models/*.js', 'routes/*.js', 'app/**/*.js','app/**/*.html', 'lib/', 'test/**/test_entry.js', 'test/**/simple_test.js', 'app/js/**/*.jsx', 'client.jsx','test/**/notes_controller_test.js'],
        tasks: ['jshint:dev', 'build'],
      }
    }

  });
};
