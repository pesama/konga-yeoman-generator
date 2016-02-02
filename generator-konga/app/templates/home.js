'use strict';

/**
 * @ngdoc function
 * @name kongaCloudUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kongaCloudUiApp
 */
angular.module('<%= appname %>')
  .controller('<%= controllername %>', function ($scope) {

  	$scope.actions = [
  		{
  			title: 'Add metadata',
	  		name: 'add-metadata',
	  		type: 'success',
        icon: 'plus'
  		},
  		{
  			title: 'Customize the app',
	  		name: 'customize-app',
	  		type: 'primary',
        icon: 'pencil'
  		},
  		{
  			title: 'Konga docs',
	  		name: 'konga-docs',
	  		type: 'default',
        icon: 'book'
  		}
  	];

  });
