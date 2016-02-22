'use strict';

/* App Module */

var donextApp = angular.module('donextApp', [
  'ngRoute',
  'ngMaterial',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'authService'
]);

donextApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).    
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]).run(['Auth', '$timeout',
    function(Auth, $timeout){
      $timeout(Auth.setUser, 6000);
  }]);


