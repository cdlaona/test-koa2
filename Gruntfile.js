module.exports=function(grunt){
    //任务配置
    grunt.initConfig({
        watch : {
            server : {
                files: ['views/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon : {
            dev : {
                script : 'bin/www',
                options : {
                    ext : 'js, html'
                }
            }
        },

        concurrent:{
            dev : {
                tasks : ['nodemon', 'watch'],
                options : {
                    logConcurrentOutput : true
                }
            }
        }
    });

    //载入任务
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    //注册任务
    grunt.registerTask('default',['nodemon:dev']);
};