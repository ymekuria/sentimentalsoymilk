angular.module('app.trip', ['app.services'])

.controller('TripController', function ($scope, $http, ActivitiesData, $routeParams) {

  $scope.id = $routeParams.id;

  ActivitiesData.getTripActivities($scope.id, function (tripObj) {
    console.log('tripobj ', tripObj);
    $scope.activities = tripObj.data.list;
    $scope.name = tripObj.data.name;
    $scope.destination = tripObj.data.destination;
  });

})