angular.module('app.create', [])

.controller('CreateTripController', function ($scope, $http) {



  // variable to determine if the form is completed
  // if it's false, the form with show
  // if true, the form will hide and the right side of page will populate
  $scope.formCompleted = false;
  // this function is to 
    // 1. hide the form
    // 2. trigger the search *** TODO
  $scope.startItinerary = function () {
    console.log('start itinerary');
    if (!$scope.itineraryName || !$scope.city || !$scope.state) {
      return;
    } else {
      $scope.formCompleted = true;
    }
  };
})