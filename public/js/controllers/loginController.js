angular.module('app.login', [])

.controller('LoginController', function ($scope, $http) {


  // login function to be called when input form submitted
  $scope.login = function () {
    var userData = {
      "username":$scope.username,
      "password":$scope.password
    }
    $http.post('/login', userData)
      .success(function () {
        // redirect to main page
      })
  };

  // sign up function to be called when input form submitted
  $scope.signup = function () {
    var userData = {
      "username":$scope.username,
      "password":$scope.password
    }
    $http.post('/signup', userData)
      .success(function () {
        // redirect to main page
      })
  };
})