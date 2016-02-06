// Generated on 2015-10-18 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['&lt;%= yeoman.app %&gt;/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '&lt;%= connect.options.livereload'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['&lt;%= yeoman.app %&gt;/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '&lt;%= connect.options.livereload'
        },
        files: [
          '&lt;%= yeoman.app %&gt;/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '&lt;%= yeoman.app %&gt;/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '&lt;%= yeoman.dist %&gt;'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '&lt;%= yeoman.app %&gt;/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '&lt;%= yeoman.dist %&gt;/{,*/}*',
            '!&lt;%= yeoman.dist %&gt;/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['&lt;%= yeoman.app %&gt;/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '&lt;%= karma.unit.configFile %&gt;',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '&lt;%= yeoman.dist %&gt;/scripts/{,*/}*.js',
          '&lt;%= yeoman.dist %&gt;/styles/{,*/}*.css',
          '&lt;%= yeoman.dist %&gt;/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '&lt;%= yeoman.dist %&gt;/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '&lt;%= yeoman.app %&gt;/index.html',
      options: {
        dest: '&lt;%= yeoman.dist %&gt;',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['&lt;%= yeoman.dist %&gt;/{,*/}*.html'],
      css: ['&lt;%= yeoman.dist %&gt;/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '&lt;%= yeoman.dist %&gt;',
          '&lt;%= yeoman.dist %&gt;/images',
          '&lt;%= yeoman.dist %&gt;/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '&lt;%= yeoman.dist %&gt;/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '&lt;%= yeoman.dist %&gt;/scripts/scripts.js': [
    //         '&lt;%= yeoman.dist %&gt;/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '&lt;%= yeoman.app %&gt;/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '&lt;%= yeoman.dist %&gt;/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '&lt;%= yeoman.app %&gt;/images',
          src: '{,*/}*.svg',
          dest: '&lt;%= yeoman.dist %&gt;/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '&lt;%= yeoman.dist %&gt;',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '&lt;%= yeoman.dist %&gt;'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['&lt;%= yeoman.dist %&gt;/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '&lt;%= yeoman.app %&gt;',
          dest: '&lt;%= yeoman.dist %&gt;',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/**/*',
            'fonts/**/*',
            'scripts/**/*',
            'lib/**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '&lt;%= yeoman.dist %&gt;/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '&lt;%= yeoman.dist %&gt;'
        }, {
          expand: true,
          src: 'app.yaml',
          dest: '&lt;%= yeoman.dist %&gt;'
        }]
      },
      bower: {
        expand: true,
        dest: '&lt;%= yeoman.dist %&gt;',
        src: 'bower_components/**/*'
      },
      styles: {
        expand: true,
        cwd: '&lt;%= yeoman.app %&gt;/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'ui.konga.config',
        dest: '&lt;%= yeoman.dist %&gt;/scripts/config.js'
      },
      // Environment targets
      development: {
        constants: {
          kongaConfig: grunt.file.readJSON('app/config/konga-config.json')
          metadata: grunt.file.readJSON('app/config/metadata.json')
        }
      }
    },

    ngtemplates: {
      'devApp': {
        cwd: 'app/',
        src: 'views/**/**.html',
        dest: 'dist/scripts/views.js',
        options:  {
          url:    function(url) { return '/' + url; } // XXX Remove this for non / webs
        }
      }
    },

    concat: {
      actions: {
        src: '&lt;%= yeoman.app %&gt;/scripts/actions/*.js',
        dest: '&lt;%= yeoman.dist %&gt;/scripts/actions.js',
        options: {
          banner: '\'use strict\';\n\n// Custom actions - GENERATED FILE\nvar customActions = {\n\t\'custom-actions-go-here\': {}',
          footer: '\n};',
          process: function(src, filepath) {
            var fileName = filepath.substring(filepath.lastIndexOf('/')+1);
            var actionName = fileName.substring(0, fileName.indexOf('.js'));
            var escapedAction = src.split('\n').join('\n\t');

            return ',\n\n\t// Action: ' + actionName + '\n\t\'' + actionName + '\'' + ': ' + escapedAction;
          }
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    // 'useminPrepare',
    'concurrent:dist',
    // 'autoprefixer',
    'concat:actions',
    'ngAnnotate',
    'copy:dist',
    'copy:bower',
    'ngconstant',
    'ngtemplates'
    // 'cdnify',
    // 'cssmin',
    // 'filerev'
    // 'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
