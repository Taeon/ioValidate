module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    separator: ';\n'
                },
                src: [
//                    'src/js/utils.js',
                    'src/js/ioValidate.js',
                    'src/js/validator.js',
                    'src/js/definition.js',
                    'src/js/Validators/*.js'
                ],
                dest: 'dist/js/iovalidate.js'
            },
        },
        watch: {
            js:{
                files: ['<%= concat.js.src %>'],
                tasks: ['concat:js','uglify']
            },
            options: {
                spawn: false,
            }
        },
        uglify: {
            js: {
                files:{
                    'dist/js/iovalidate.min.js': 'dist/js/iovalidate.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask(
        'default',
        [
            'concat:js',
        //    'uglify'
        ]
    );

};
