angular.module('app.mytrips', ['app.services'])

// ActivitiesData is a factory/service laoded from app.services
// $location is for redirecting
.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location, Ratings) {

  //<h4>ActivitiesData.getTrips</h4>
  // Is a function to get all trips to populate myTrips page
  // trips are stored in an $scope.tripResults as an array
  $scope.tripResults = 1;
  $scope.ratingArray; 
  //scope.ratingArray, where all the ratings will go 
  //calls Activities Data factory's getTrips - routes to /trips
  ActivitiesData.getTrips()
  //returns results
  .then(function(results){
    $scope.tripResults = results.data;
    var tripids = $scope.tripResults.map(function(element) {
      return element.id})
    Ratings.getPlaylistRating(tripids)
    .then(function(data) {
      //data.data is obj where keys are pl id and values are
      //array of ratings
      $scope.ratingArray = data.data;
      Ratings.calcRatings($scope.ratingArray, $scope.tripResults)
      console.log('updated results', $scope.tripResults)
    }) 
  })

  
  //Ratings.calcRatings($scope.ratingArray, $scope.tripResults)

  //console.log('before', $scope.tripResults)

  // Ratings.calcRatings($scope.ratingArray, $scope.tripResults);

  // console.log('after', $scope.tripResults)

  // console.log('SHOULD HAVE RATINGS', $scope.tripResults);

  // <h4>$scope.viewTrip</h4>
  // Is a function called when a specific playlist/trip is clicked on
  $scope.viewTrip = function (index) {
    // $scope.id stores the _.id for the specific trip
    $scope.id = $scope.tripResults[index].id;
    $location.path('/trip/' + $scope.id);
  };
})