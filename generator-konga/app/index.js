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

	// Say hello and start crafting
	constructor: function() {
		generators.Base.apply(this, arguments);

		this._appName();

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
	      this.sourcePath('/static/action-function.js'),
	      this.destinationPath('app/scripts/actions/konga-docs.js')
	    );

	    // Sample modal controller
	    this.fs.copy(
	      this.sourcePath('/static/modal-controller.js'),
	      this.destinationPath('app/scripts/controllers/sample-modal-controller.js')
	    );

	    // Modal templates
	    this.fs.copy(
	      this.sourcePath('/static/add-metadata.html'),
	      this.destinationPath('app/views/add-metadata.html')
	    );
	    this.fs.copy(
	      this.sourcePath('/static/customize-app.html'),
	      this.destinationPath('app/views/customize-app.html')
	    );
	},

	gruntFile: function() {

	},

	configuration: function() {

	},

	// Private methods

	_createFile: function(destination, name, translations) {

	},

	_createFolder: function(destination, name) {

	}

});