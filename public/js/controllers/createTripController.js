angular.module('app.create', ['app.services'])

.controller('CreateTripController', function ($scope, $http, ActivitiesData) {
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
      $http.get('/activities/' + $scope.city + ',' + $scope.state)
      // $http.get('/activities/')
        .success(function (data) {
          console.log(data);
          $scope.activities = data;
        });
    }
  };

  $scope.itinerary = []; 

  $scope.addToTrip = function(){
    console.log(this.activity);
    $scope.itinerary.push(this.activity);
  };

  $scope.saveItinerary = function () {
    // POST request to /trips with $scope.itinerary 
    var itinerary = JSON.stringify($scope.itinerary);
    ActivitiesData.createTrip(itinerary);
  };
});