module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
		/*编译sass*/
		compass: {                 
			dist: {                   
				options: {             
					sassDir: 'public/app/styles/sass',
					cssDir: 'public/app/styles/css',
					environment: 'development'
				}
			}
		},
		/*合并*/
		concat: {
			options: {
				banner: '<%= banner %>' 
			},
			js: {
				src: ['public/app/js/router/*','public/app/js/controller/*','public/app/js/directives/*'],
				dest: 'public/app/js/app.js'
			},
		},
		/*压缩*/
		uglify: {
			options:{
				banner: '<%= banner %>'
			},
			dist: {
				files: [{
					src: '<%= concat.js.dest %>',
					dest: 'public/app/js/app.min.js' 
				}]
			}
		},
		/*检错*/
		jshint: {
			files: ['gruntfile.js', 'public/app/js/*.js'],
		},
		/*监测*/
		watch: {
			sass: {
				files: ['public/app/styles/**/*'],
				tasks: ['compass']
			},
			js: {
				files: ['public/app/js/**/*'],
				tasks: ['concat','jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat','compass','watch']);
};