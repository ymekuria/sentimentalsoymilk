angular.module('app.mytrips', ['app.services'])

// ActivitiesData is a factory/service laoded from app.services
// $location is for redirecting
.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location, Ratings) {

  //<h4>ActivitiesData.getTrips</h4>
  // Is a function to get all trips to populate myTrips page
  // trips are stored in an $scope.tripResults as an array
  $scope.ratingArray = []

  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;

    var tripids = $scope.tripResults.map(function(element) {
      return element.id})

    Ratings.getPlaylistRating(tripids)
    .then(function(data) {
      console.log('got the trips')
      $scope.ratingArray = data.data

      console.log($scope.ratingArray)

      //need to average the ratings
    }) 
  })
  
  

  // <h4>$scope.viewTrip</h4>
  // Is a function called when a specific playlist/trip is clicked on
  $scope.viewTrip = function (index) {
    // $scope.id stores the _.id for the specific trip
    $scope.id = $scope.tripResults[index].id;
    $location.path('/trip/' + $scope.id);
  };
})