
//  This controller applies to the createTrip.html
angular.module('app.create', ['app.services'])

//  Factory functions are loaded in in 'ActivitiesData' from 'app.services'
.controller('CreateTripController', function ($scope, $http, ActivitiesData) {
  
  // $scope.formCompleted is a variable to determine if the form is completed
  // if it's false, the form with show
  // if true, the form will hide and the right side of page will populate
  $scope.formCompleted = false;
  
  // <h3>startItinerary is a function to: </h3>
    // 1. hide the form
    // 2. trigger the search
  $scope.startItinerary = function () {
    console.log('start itinerary');
    if (!$scope.itineraryName || !$scope.city) {
      return;
    } else {
      // this removes the form
      $scope.formCompleted = true;
      $http.get('/activities/' + $scope.city + ',' + $scope.state)
        .success(function (data) {
          console.log("get/activities", data);
          $scope.activities = data;
        });
  };

  // $scope.itinerary is an array that contains 
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