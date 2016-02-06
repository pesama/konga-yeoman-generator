var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

	_appName: function() {
		this.argument('userappname', { type: String, required: false });
		var appName = this.appname + 'App';
		if(this.userappname) {
			appName = this.userappname;
		}

		this.appname = appName;
	},

	_endpoints: function() {
		// TODO TODO
		this.devendpoint 	= 'http://localhost/api';
		this.endpoint 		= 'https://api.' + this.appname + '.com';
	},

	// Say hello and start crafting
	constructor: function() {
		generators.Base.apply(this, arguments);

		this._appName();
		this._endpoints();

		this.log('Hi! We are so happy to see you!');
		this.log('So let\'s craft the konga application ' + this.appname);
		this.log('You will see no prompts on this process. To override defaults launch this using --verbose option');
	},
	
	folderStructure: function() {
		this.log('Let\'s create some folders');

		var folders = [
			'app',
			'app/config',
			'app/scripts',
			'app/scripts/actions',
			'app/scripts/controllers',
			'app/scripts/directives',
			'app/scripts/services',
			'app/styles',
			'app/views'
			// TODO Test
		];

		for(var i = 0; i < folders.length; i++) {
			mkdirp.sync(folders[i]);
			this.log('   Created folder /' + folders[i]);
		}
	},

	index: function() {
		this.log('Now an index.html file');

		this.fs.copyTpl(
	      this.templatePath('index.html'),
	      this.destinationPath('app/index.html'),
	      { 
	      	title: this.appname + ', an awesome application' 
	      	// TODO More params
	      }
	    );
	},

	appCode: function() {
		this.log('And the Angular configuration files');

		this.fs.copyTpl(
	      this.templatePath('app.js'),
	      this.destinationPath('app/scripts/app.js'),
	      { 
	      	appname: this.appname,
	      	modules: 	[
	      					'ui.konga.config',	
	      					'ui.konga'
	      				].join('\', \'')
	      	// TODO More params
	      }
	    );
	},

	sampleCode: function() {
		this.log('You will need some sample code...');

		// Home controller
		this.fs.copyTpl(
	      this.templatePath('home.js'),
	      this.destinationPath('app/scripts/controllers/home.js'),
	      { 
	      	appname: this.appname,
	      	controllername: 'HomeCtrl'
	      }
	    );

		// Home view
	    this.fs.copyTpl(
	      this.templatePath('home.html'),
	      this.destinationPath('app/scripts/views/home.html'),
	      { 
	      	appname: this.appname,
	      	controllername: 'HomeCtrl'
	      }
	    );

	    // Add-metadata action
	    this.fs.copyTpl(
	      this.templatePath('action-modal.js'),
	      this.destinationPath('app/scripts/actions/add-metadata.js'),
	      { 
	      	template: '/views/add-metadata.html',
	      	controller: 'SampleModalCtrl'
	      }
	    );

	    // customize-app action
	    this.fs.copyTpl(
	      this.templatePath('action-modal.js'),
	      this.destinationPath('app/scripts/actions/customize-app.js'),
	      { 
	      	template: '/views/customize-app.html',
	      	controller: 'SampleModalCtrl'
	      }
	    );

	    // Konga-docs
	    this.fs.copy(
	      this.templatePath('static/action-function.js'),
	      this.destinationPath('app/scripts/actions/konga-docs.js')
	    );

	    // Sample modal controller
	    this.fs.copy(
	      this.templatePath('static/modal-controller.js'),
	      this.destinationPath('app/scripts/controllers/sample-modal-controller.js')
	    );

	    // Modal templates
	    this.fs.copy(
	      this.templatePath('static/add-metadata.html'),
	      this.destinationPath('app/views/add-metadata.html')
	    );
	    this.fs.copy(
	      this.templatePath('static/customize-app.html'),
	      this.destinationPath('app/views/customize-app.html')
	    );
	},

	gruntFile: function() {
		this.log('And a Gruntfile with some tasks');

	    this.fs.copyTpl(
	      this.templatePath('Gruntfile.js'),
	      this.destinationPath('Gruntfile.js'),
	      { 
	      	appname: this.appname,
	      	devendpoint: this.devendpoint,
	      	endpoint: this.endpoint,
	      	yeoman: {
	      		app: '<%= yeoman.app %>',
	      		dist: '<%= yeoman.dist %>'
	      	},
	      	connect_options_livereload: '<%= connect.options.livereload',
			karma_unit_configFile: '<%= karma.unit.configFile %>'

	      }
	    );
	},

	configuration: function() {
		this.log('Finally, let\'s create the config files');

		// Konga config
		this.fs.copyTpl(
	      this.templatePath('constant.js'),
	      this.destinationPath('app/config/konga-config.js'),
	      { 
	      	appname: this.appname,
	      	constantname: 'kongaConfig',
	      	value: "{}"
	      }
	    );

	    // Metadata
		this.fs.copyTpl(
	      this.templatePath('metadata.json'),
	      this.destinationPath('app/config/metadata.json'),
	      { 
	      	appname: this.appname
	      }
	    );
	},

	dependencies: function() {
		this.log('And install the needed dependencies');

		// Package.json
		this.fs.copyTpl(
	      this.templatePath('package.json'),
	      this.destinationPath('package.json'),
	      { 
	      	appname: this.appname,
	      	appversion: '0.0.1', // TODO
	      	appdescription: 'Awesome konga app', // TODO
	      	appauthor: 'Author', // TODO
	      	applicense: 'MIT' // TODO


	      }
	    );
	    
	    // Bower.json
		this.fs.copyTpl(
	      this.templatePath('bower.json'),
	      this.destinationPath('bower.json'),
	      { 
	      	appname: this.appname,
	      	appversion: '0.0.1', // TODO
	      	appdescription: 'Awesome konga app', // TODO
	      	appauthor: 'Author', // TODO
	      	applicense: 'MIT' // TODO
	      }
	    );	

	    var npm = [
	    	"grunt",
		    "grunt-angular-templates",
		    "grunt-autoprefixer",
		    "grunt-concurrent",
		    "grunt-contrib-clean",
		    "grunt-contrib-concat",
		    "grunt-contrib-connect",
		    "grunt-contrib-copy",
		    "grunt-contrib-cssmin",
		    "grunt-contrib-htmlmin",
		    "grunt-contrib-imagemin",
		    "grunt-contrib-jshint",
		    "grunt-contrib-uglify",
		    "grunt-contrib-watch",
		    "grunt-filerev",
		    "grunt-google-cdn",
		    "grunt-karma",
		    "grunt-newer",
		    "grunt-ng-annotate",
		    "grunt-ng-constant",
		    "grunt-svgmin",
		    "grunt-usemin",
		    "grunt-wiredep",
		    "jasmine-core",
		    "jshint-stylish",
		    "karma",
		    "karma-jasmine",
		    "karma-phantomjs-launcher",
		    "load-grunt-tasks",
		    "phantomjs",
		    "time-grunt"
	    ];

	    var bower = [
	    	"angular",
		    "angular-animate",
		    "angular-cookies",
		    "angular-google-gapi",
		    "angular-resource",
		    "angular-route",
		    "angular-sanitize",
		    "angular-touch",
		    "bootstrap",
		    "oauth-ng",
		    "ui.konga"
	    ];

	    for(var i = 0; i < npm.length; i++) {
	    	this.npmInstall(npm[i], { saveDev: true });
	    }

	    for(var i = 0; i < bower.length; i++) {
	    	this.bowerInstall(bower[i], { save: true });
	    }
	},

	goodBye: function() {
		this.log('Well, everything is done!');
		this.log('You can launch your app with \'grunt serve\'');
		this.log('And compile it for deploy with \'grunt deploy\'');
	}
});