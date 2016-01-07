
angular.module('app', ['app.login', 'app.signup', 'app.landing', 'app.create', 'app.services', 'app.mytrips', 'ngRoute'])

// template for setting up routes
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './js/templates/landing.html',
      controller: 'LandingController'
    })
    .when('/login', {
      templateUrl: './js/templates/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: './js/templates/signup.html',
      controller: 'AuthController'
    })
    .when('/create', {
      templateUrl: './js/templates/createTrip.html',
      controller: 'CreateTripController'
    })
    .when('/myTrips', {
      templateUrl: './js/templates/mytrips.html',
      controller: 'MyTripsController'
    })
    .otherwise('/');
});