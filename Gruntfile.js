const release = `/*
 *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>
 *  <%= grunt.template.today("yyyy-mm-dd") %>
 *
 *  <%= pkg.homepage %>
 */\n\n`;

const copyright = `/*
 *  Copyright (C) 2022 Interpromotion <info@interpromotion.com>
 *
 *  This file is part of Cookiebannerjs.
 *
 *  Cookiebannerjs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  Cookiebannerjs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */\n\n`;

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-esnext');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				"esnext": true
			},
			all: ['src/js/*.js']
		},
		uglify: {
			options: {
				banner: release + copyright
			},
			build: {
				src: 'src/js/cookiebanner.js',
				dest: 'build/js/cookiebanner.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'build/css/cookiebanner.css': 'src/scss/cookiebanner.scss'
				}
			}
		},
		cssmin: {
			target: {
				src: 'build/css/cookiebanner.css',
				dest: 'build/css/cookiebanner.min.css'
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },

			jshint: {
				files: 'src/js/*.js',
				tasks: ['jshint']
			},

			uglify: {
				files: ['src/js/cookiebanner.js'],
				tasks: ['uglify']
			},

			sass: {
				files: 'src/scss/cookiebanner.scss',
				tasks: ['sass']
			},

			cssmin: {
				files: 'build/css/cookiebanner.css',
				tasks: ['cssmin']
			}
		}
	});

	grunt.registerTask('build', ['jshint', 'uglify', 'sass', 'cssmin']);
	grunt.registerTask('default', ['build','watch']);
};