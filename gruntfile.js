module.exports = function (grunt) {
    var files = [ "src/**/*.js" ];

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
            },
            build: {
                src: files,
                dest: 'wwwroot/main.js'
            }
        },
        watch: {
            scripts: {
                files: files,
                tasks: ["uglify:build"]
            },
            sass: {
                files: ["content/css/**/*.scss"],
                tasks: ["sass:dev"]
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "wwwroot/style.css": "content/css/style.scss"
                }
            }
        }
    });

    // load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Javascript
    grunt.registerTask('Build Javascript', ['uglify']);
    grunt.registerTask('Watch Javascript', ['watch:scripts']);

    // SASS
    grunt.registerTask('Build SASS', ['sass:dev']);
    grunt.registerTask('Watch SASS', ['watch:sass']);

};