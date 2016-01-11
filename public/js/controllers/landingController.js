angular.module('app.landing', ['app.services'])

.controller('LandingController', function ($scope, $http, ActivitiesData, $location) {

  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
    console.log(results.data);
  })

  $scope.viewTrip = function (index) {
    $scope.id = $scope.tripResults[index]._id;
    // console.log($scope.id);
    $location.path('/trip/' + $scope.id);
    // get request to get info for trip
    // ActivitiesData.getTripActivities(index);
  };


});