angular.module('app.trip', ['app.services'])

// ActivitiesData is a factory/service loaded from app.services
// $routeParams is used to get the trip mongoose _.id
.controller('TripController', function ($scope, $http, Ratings, ActivitiesData, $routeParams) {

  
  $scope.id = $routeParams.id;
  console.log($scope.id)

  

  $scope.submitRating = function() {
    Ratings.postRatings($scope.rating, $scope.id)
      .then(function() {
        console.log('made request'); 
      })
      .catch(function(){
        console.log($scope.rating);
      })
  }


  // ActivitiesData.getTripActivities returns and object containing
  // the details for each activity stored in this trip
  // $scope.activities stores an array of all activities
  // $scope.name stores the name of the trip/playlist
  // $scope.destination stores the destionation of the trip
  ActivitiesData.getTripActivities($scope.id, function (tripObj) {

    //Refer to join table via the tripObj.data.id

    //return all activities associated with said table.....


    $scope.activities = tripObj.data.list[0];
    $scope.name = tripObj.data.name;
    $scope.area = tripObj.data.area;
    console.log(tripObj.data)
    console.log('scope is', $scope.area)
  });

})