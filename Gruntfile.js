const terser = require('@rollup/plugin-terser');

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      dist: ['dist']
    },

    rollup: {
      unminified: {
        options: {
          plugins: () => [
            require('@rollup/plugin-node-resolve').nodeResolve({ browser: true }),
            require('@rollup/plugin-commonjs')()
          ],
          external: ['video.js'],
          output: {
            format: 'iife',
            name: 'VideoJSThemePlugin',
            globals: {
              'video.js': 'videojs'
            }
          }
        },
        files: {
          'dist/videojs-skin.js': 'src/js/videojs-skin.js'
        }
      },
      minified: {
        options: {
          plugins: () => [
            require('@rollup/plugin-node-resolve').nodeResolve({ browser: true }),
            require('@rollup/plugin-commonjs')(),
            terser()
          ],
          external: ['video.js'],
          output: {
            format: 'iife',
            name: 'VideoJSThemePlugin',
            globals: {
              'video.js': 'videojs'
            }
          }
        },
        files: {
          'dist/videojs-skin.min.js': 'src/js/videojs-skin.js'
        }
      }
    },

    sass: {
      dist: {
        options: {
          implementation: require('sass'),
          outputStyle: 'compressed'
        },
        files: {
          'dist/videojs-skin.min.css': 'src/scss/videojs-skin.scss'
        }
      }
    },
    concat: {
      index: {
          options: {
              banner: 'import "./style.css";\n', // Add CSS import at the top
              footer: '\nexport { default } from "./videojs-skin.normal.js";' // Add JS export at the bottom
          },
          src: [], // No need for actual content, just headers & footers
          dest: 'dist/index.js'
      }
    },
    copy: {
      direct_files: { // Add this section
        files: [
          {
            src: 'README.md',
            dest: 'dist/README.md'
          },
          {
            src: 'package.json', // Copy package.json
            dest: 'dist/package.json'
          },
          {
            src: 'LICENSE.md', // Copy package.json
            dest: 'dist/LICENSE.md'
          }
        ]
      }
    },

  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['clean', 'rollup:unminified', 'rollup:minified', 'sass','copy:direct_files']);
};
