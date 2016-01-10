angular.module('app.auth', [])

.controller('AuthController', function ($scope, $http, $location) {


  // login function to be called when input form submitted
  $scope.login = function () {
    $scope.error = '';
    var userData = {
      "username":$scope.username,
      "password":$scope.password
    }
    console.log("Attempting to login", userData)
    $http.post('/api/login', userData)
      .then(function(result){
        if(result.data){
          //redirect to my trips
          $location.path("/myTrips");
        } else {
          //stay on login
          $scope.error = "Please Try Again"
        }
      })
  };

  // sign up function to be called when input form submitted
  $scope.signup = function () {
    var userData = {
      "username":$scope.signUpUsername,
      "password":$scope.signUpPassword
    }
    console.log('User entered signup data',userData)
    $http.post('/api/signup', userData)
    .then(function(result){
      console.log("Successfully created user", result);
      //redirect
    })
  };
})