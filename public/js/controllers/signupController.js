angular.module('app.signup', [])

.controller('SignupController', function ($scope, $http) {


  // signup function to be called when input form submitted
  $scope.signup = function () {
    var userData = {
      "username":$scope.username,
      "password":$scope.password
    }
    $http.post('/signup', userData)
      .success(function () {
        alert("post/sign up hit the server");
        // redirect to main page
      })
  };
})