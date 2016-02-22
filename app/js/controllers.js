'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('sidenavCtrl', ['$scope', 'Auth',
  function($scope, Auth) {
    $scope.$watch(Auth.isAuthenticated, function(){
      $scope.user = Auth.getUser() ;
    });
  }
]);

phonecatControllers.controller('appCtrl', function($scope, $timeout, $mdSidenav, $log, Auth) {
  $scope.toggleLeft = buildDelayedToggler('left');
  
  $scope.userLoaded = userLoaded;
  
  function userLoaded(){
    console.log('load user');
    Auth.setUser();
  }

  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
});


phonecatControllers.controller('HomeCtrl', ['$scope',
  function($scope) {

  }
]);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({
      phoneId: $routeParams.phoneId
    }, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }
]);