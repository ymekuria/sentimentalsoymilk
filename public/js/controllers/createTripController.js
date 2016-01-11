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
    // if (!$scope.itineraryName || !$scope.city || !$scope.state) {
    //   return;
    // } else {
      $scope.formCompleted = true;
      $http.get('/activities/' + $scope.city + ',' + $scope.state)
      // $http.get('/activities/')
        .success(function (data) {
          console.log("get/activities", data);
          $scope.activities = data;
        });
    // }
  };

  $scope.itinerary = []; 

  $scope.addToTrip = function(){
    if ($scope.itinerary.length === 0) {
      $scope.itineraryImage = this.activity.photo;
    }
    $scope.itinerary.push(this.activity);
  };

  $scope.removeFromTrip = function () {
    var index = $scope.itinerary.indexOf(this.activity);
    $scope.itinerary.splice(index, 1);
  };

  $scope.saveItinerary = function () {
    // POST request to /trips with $scope.itinerary 

    var activityIds = $scope.itinerary.map(function (activity) {
      return activity._id;
    });
    console.log("ACTIVITY:", activityIds);
    var tripObj = {
      name: $scope.itineraryName,
      city: $scope.city,
      state: $scope.state,
      activities: activityIds,
      image: $scope.itineraryImage
    };
    var trip = JSON.stringify(tripObj);
    ActivitiesData.createTrip(trip);
  };
});