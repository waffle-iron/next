var authService = angular.module('authService', ['ngCookies']);

authService.factory('Auth', [
  function(){
    var _user = null;
    return {
      getUser: function(){
        return _user;
      },
      setUser: function(){
        _user = 'george';
      },
      isAuthenticated: function(){
        return _user !== null;
      }
    }
  }
]);