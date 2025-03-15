module.exports = function (grunt) {
    // Load NPM Tasks
    require('load-grunt-tasks')(grunt);
  
    grunt.initConfig({
      // Compile SCSS to CSS
      sass: {
        options: {
          implementation: require('sass'), // Use Dart Sass
          sourceMap: false
        },
        dist: {
          files: {
            'dist/style.css': 'src/scss/videojs-quiz.scss'
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
              src: ['videojs-quiz.js'], // Source file
              dest: 'dist/', // Destination folder
              rename: function (dest, src) {
                return dest + src.replace('.js', '.normal.js'); // Rename as normal.js
              }
            }
          ]
        }
      },
  
      // Minify JavaScript
      uglify: {
        dist: {
          files: {
            'dist/videojs_quiz.min.js': ['src/js/videojs-quiz.js'] // Minified version
          }
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
    grunt.registerTask('default', ['sass', 'copy:js', 'uglify', 'watch']);
  };
  