angular.module('app', ['app.login'])

// template for setting up routes
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {

    })
    .otherwise('/');
});