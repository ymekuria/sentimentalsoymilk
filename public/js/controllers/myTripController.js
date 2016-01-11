angular.module('app.mytrips', ['app.services'])

.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location) {
  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
  });

  $scope.viewTrip = function (index) {
    $location.path('/trip/' + id);
    $scope.id = $scope.tripResults[index]._id;
    console.log($scope.id);
    // get request to get info for trip
    ActivitiesData.getTripActivities(index);
  };
})