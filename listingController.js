angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.newListing = '';

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */

    $scope.showDetails = function(listing) {
      $scope.selected = listing;
    };
    $scope.selected = {};



    $scope.addListing = function() {
      $scope.listings.push($scope.newListing);
      $scope.listing= '';
    };

    $scope.deleteListing = function() {
	for(var i = 0; i < $scope.listings.length; ++i){
		if($scope.selected.code === $scope.listings[i].code){
			Listings.splice(i, 1);
			break;
		}
	}
        
        $scope.selected = {};
    };
  }
]);
