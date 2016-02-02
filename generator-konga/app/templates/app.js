'use strict';

/**
 * @ngdoc overview
 * @name <%= appname %>
 * @description
 * # <%= appname %>
 *
 * An awesome description for an awesome app
 */
angular
  .module('<%= appname %>', ['<%= modules %>'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('interceptors');
  }])
  .run(['metadata', '$rootScope', 'common', function(metadata, $rootScope, common) {
    // Save in scope
    // FIXME Remove
    $rootScope.metadata = metadata;

    // Store the metadata
    common.store('metadata', metadata);

    // Init the tools
    util.init(metadata);
  }]);
