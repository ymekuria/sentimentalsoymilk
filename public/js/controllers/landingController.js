angular.module('app.landing', ['app.services'])

.controller('LandingController', function ($scope, $http, ActivitiesData) {

  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
    console.log(results.data);
  })


});