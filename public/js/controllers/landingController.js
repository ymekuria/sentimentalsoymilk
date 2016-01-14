angular.module('app.landing', ['app.services'])

// ActivitiesData a factory/service stored in app.services
// $location is for redirecting

.controller('LandingController', function ($scope, $http, Ratings, ActivitiesData, $location) {


  $scope.timeOptions = ['Quarter Day', 'Half Day', 'Full Day', 'Night'];
  // this stores the value of what time duration the user wants to filter for use in a get request along with location info.
  var searchedTime;
  $scope.time;


  //CREATE AN object to send time and location to the api
  $scope.searchData = {};
  
  $scope.searchTime = function (time) {
    console.log('you selected', time);
    

  };

  $scope.filteredByTimeTrips = function () {
    // make a get 
    ActivitiesData.getSearchedTrips($scope.searchData)
      .then(function(trips){
        $scope.searchResults = trips.data;  
      })

  }

 
  // <h4>ActivitiesData.getTrips()</h4>
  // function that gets all the trips to populate the landing page
  // trips are stored in $scope.tripResults
  ActivitiesData.getTrips()
  .then(function(results){
    console.log('TRIP RESULTS', results.data)
    $scope.tripResults = results.data;
    console. log('trip results', results.data);
  })

  // Redirect to view playlist information
  $scope.viewTrip = function (index) {
    // $scope.id is the mongoose _.id for the trip
    $scope.id = $scope.tripResults[index].id;
    $location.path('/trip/' + $scope.id);
  };

});