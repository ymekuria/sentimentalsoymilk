angular.module('app.wishlist', ['app.services'])

// ActivitiesData is a factory/service laoded from app.services
// $location is for redirecting
.controller('WishListController', function ($scope, $http, ActivitiesData, $location) {

  //<h4>ActivitiesData.getTrips</h4>
  // Is a function to get all trips to populate myTrips page
  // trips are stored in an $scope.tripResults as an array

  // this function removes a playlist from the wishlist when the remove button is clicked. need to refactor
  $scope.removePlaylist = function () {
    
    console.log('this', this);
    var index = $scope.tripResults.indexOf(this);

    $scope.tripResults.splice(index, 1);
  };

  // need to either modify this or create a new function that GETS all the trips in a users wishlist
  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
  });

  // <h4>$scope.viewTrip</h4>
  // Is a function called when a specific playlist/trip is clicked on
  $scope.viewTrip = function (index) {
    // $scope.id stores the _.id for the specific trip
    $scope.id = $scope.tripResults[index]._id;
    $location.path('/trip/' + $scope.id);
  };
})