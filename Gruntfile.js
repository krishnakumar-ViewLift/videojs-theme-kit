module.exports = function (grunt) {
    // Load NPM Tasks
    require('load-grunt-tasks')(grunt);
  
    grunt.initConfig({
      // Compile SCSS to CSS
      sass: {
        options: {
          implementation: require('sass'), // Use Dart Sass
          sourceMap: false,
          includePaths: ['src/scss'] 
        },
        dist: {
          files: {
            'dist/sty.css': 'src/scss/videojs-skin.scss'
          }
        }
      },
  
      // Copy the original JS file (Unminified version)
      copy: {
        js: {
          files: [
            {
              expand: true,
              cwd: 'src/js/',
              src: ['videojs-skin.js'], // Source file
              dest: 'dist/', // Destination folder
              rename: function (dest, src) {
                return dest + src.replace('.js', '.normal.js'); // Rename as normal.js
              }
            }
          ]
        },
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

  
      // Minify JavaScript
      uglify: {
        dist: {
          files: {
            'dist/videojs_skin.min.js': ['src/js/videojs-skin.js'] // Minified version
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

  
      // Watch for changes
      watch: {
        css: {
          files: 'src/scss/**/*.scss',
          tasks: ['sass']
        },
        js: {
          files: 'src/js/**/*.js',
          tasks: ['copy:js', 'uglify']
        }
      }
    });
  
    // Load plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Register default task
    grunt.registerTask('default', ['sass', 'copy:js', 'copy:direct_files', 'uglify','concat', 'watch']);
  };
  