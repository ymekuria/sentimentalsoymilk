angular.module('app.create', [])

.controller('CreateTripController', function ($scope, $http) {

  $scope.formCompleted = false;


  $scope.startItinerary = function () {
    console.log('start itinerary');
    if (!$scope.itineraryName || !$scope.city || !$scope.state) {
      return;
    } else {
      $scope.formCompleted = true;
    }
  };
})