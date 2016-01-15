angular.module('app.landing', ['app.services'])

// ActivitiesData a factory/service stored in app.services
// $location is for redirecting
.controller('LandingController', function ($scope, $http, Ratings, ActivitiesData, $location) {

  // <h4>ActivitiesData.getTrips()</h4>
  // function that gets all the trips to populate the landing page
  // trips are stored in $scope.tripResults
  ActivitiesData.getTrips()
  .then(function(results){
    console.log('TRIP RESULTS', results.data)
    $scope.tripResults = results.data;
  })

  // Redirect to view playlist information
  $scope.viewTrip = function (index) {
    // $scope.id is the mongoose _.id for the trip
    $scope.id = $scope.tripResults[index].id;
    $location.path('/trip/' + $scope.id);
  };

});