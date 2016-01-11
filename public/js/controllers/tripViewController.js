angular.module('app.trip', ['app.services'])

.controller('TripController', function ($scope, $http, ActivitiesData, $routeParams) {

  $scope.id = $routeParams.id;

  ActivitiesData.getTripActivities($scope.id, function (data) {
    $scope.activities = data.data;
  });

})