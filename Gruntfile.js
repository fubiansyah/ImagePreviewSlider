module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            //test
            test: {
                src: [
                    'src/imagepreviewslider.js'
                ],
                dest: 'test/js/imagepreviewslider.js',
            },
        },
        
        uglify: {
            main: {
                src: 'src/imagepreviewslider.js',
                dest: 'src/imagepreviewslider.min.js'
            },
            test: {
                src: 'test/js/imagepreviewslider.js',
                dest: 'test/js/imagepreviewslider.min.js'
            },
        },
        less: {
            main: {
                options: {
                    paths: [
                        "src/less",
                        "test/css/less",
                    ],
                    compress: false
                },
                files: {
                    "src/imagepreviewslider.css": "src/less/imagepreviewslider.less",
                    "test/css/style.css": "test/css/less/main.less",
                }
            }
        },
        watch: {
            js_concat: {
                files: ['src/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            js_uglify: {
                files: ['src/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            doless: {
                files: [
									'test/css/**/*.less',
									'src/**/*.less'
								],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['concat','uglify','watch','less']);

};