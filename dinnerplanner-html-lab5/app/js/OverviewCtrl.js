dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {
 	$scope.numberOfGuests = Dinner.getNumberOfGuests();
 	$scope.menu = Dinner.getFullMenu();

 	$scope.priceOf = function(id){
 		return Dinner.getPrice(id);
 	}

 	$scope.totalMenuPrice = function(){
 		return Dinner.getTotalMenuPrice();
 	}
});