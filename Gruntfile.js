/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    //concat: {
    //  options: {
    //    banner: '<%= banner %>',
    //    sourceMap: true,
    //    stripBanners: true
    //  },
    //  dist: {
    //    src: ['lib/**/*.js', 'js/**/*.js'],
    //    //dest: 'dist/apa.js'
    //    dest: 'dist/<%= pkg.name %>.js'
    //  }
    //},
    //uglify: {
    //  options: {
    //    banner: '<%= banner %>'
    //  },
    //  dist: {
    //    src: '<%= concat.dist.dest %>',
    //    dest: 'dist/<%= pkg.name %>.min.js'
    //  }
    //},
    copy: {
        sources: {expand: true, src: ['css/**','js/**','lib/**'], dest: 'debug/', filter: 'isFile'},
        testpages: {expand: true, cwd: 'testpages/', src: '**', dest: 'debug/', filter: 'isFile'},
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      copytestpages: {
        files: '<%= copy.testpages.cwd %><%= copy.testpages.src %>',
        tasks: ['copy:testpages'] 
      },
      copysrc: {
        files: '<%= copy.sources.src %>',
        tasks: ['copy:sources'] 
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  //grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('default', ['copy:sources','copy:testpages','watch']);

};
