angular.module('app.landing', [])

.controller('LandingController', function ($scope, $http) {
  $scope.itineraries = [
    {
      name:"Sushi Place",
      location:"San Francisco",
      rating:4.3
    },
    {
      name:"Museum",
      location:"San Francisco",
      rating:2.7
    },
    {
      name:"Dive Bar",
      location:"San Francisco",
      rating:3.3
    },
    {
      name:"Golden Gate Park",
      location:"San Francisco",
      rating:4.6
    },
    {
      name:"Downtown",
      location:"Oakland",
      rating:3.1
    },
    {
      name:"Jack London Square",
      location:"Oakland",
      rating:4.5
    },
  ];
});