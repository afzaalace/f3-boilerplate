module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            favicon: {
                options: {},
                files: [{
                    expand: true,
                    cwd: "app/assets/",
                    src: ['favicon.ico'],
                    dest: "deploy/assets/"
                }]
            },
        },
        sass: {
            css: {
                options: {
                    sourceMap: true,
                    imagePath: "/assets/images"
                },
                files: []
            }
        },
        concat: {
            css: {
                files: []
            },
            js: {
                files: []
            }
        },
        cssmin: {
            css: {
                files: [],
                options: {
                    noAdvanced: true
                }
            },
        },
        uglify: {
            js: {
                files: [],
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                }
            },
        },
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 2
                },
                files: [{
                    expand: true,
                    cwd: "app/assets/images",
                    src: ['*.png', '*.jpg', '*.gif'],
                    dest: "deploy/assets/images/"
                }, {
                    expand: true,
                    cwd: "app/assets/images",
                    src: ['**/*.png', '**/*.jpg', '**/*.gif'],
                    dest: "deploy/assets/images/"
                }]
            }
        },
        clean: {
            all: [
                "./tmp/",
                "./deploy/assets",
            ]
        },
        watch: {
            css: {
                files: ['app/assets/**/*.scss', 'tmp/**/*.css'],
                tasks: [
                    'newer:sass:css', // Process SASS
                    'concat:css', // Concat CSS
                    'newer:cssmin:css' // Minify CSS
                ],
                options: {
                    spawn: false,
                    message: "Changes updated."
                }
            },
            js: {
                files: ['app/assets/**/*.js', 'tmp/js/*.js', 'tmp/templates/*.js'],
                tasks: [
                    'concat:js', // Concat JS
                    'newer:uglify:js' // Minify JS
                ],
                options: {
                    spawn: false,
                    message: "Changes updated."
                },
            },
            images: {
                files: ['app/assets/**/*.jpg', 'app/assets/**/*.png', 'app/assets/**/*.gif'],
                tasks: [
                    'newer:imagemin:all' // Optimize Images
                ],
                options: {
                    spawn: false,
                    message: "Changes updated."
                },
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [
        'newer:copy:favicon', // Copy Favicon
        'newer:sass:css', // Process SASS
        'concat:css', // Concat CSS
        'newer:cssmin:css', // Minify CSS
        'concat:js', // Concat JS
        'newer:uglify:js', // Minify JS
        'newer:imagemin:all', // Optimize Images
    ]);
    grunt.registerTask('dev', ['watch', 'notify:watch']);
}
