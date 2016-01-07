angular.module('app', ['app.login', 'app.signup','ngRoute'])

// template for setting up routes
.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: './js/templates/login.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: './js/templates/signup.html',
      controller: 'SignupController'
    })
    .otherwise('/');
});