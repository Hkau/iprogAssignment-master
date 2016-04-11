// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
	$scope.DishID = $routeParams.dishId;
	$scope.guests = Dinner.getNumberOfGuests();

	$scope.getActive = function(){
		$scope.status = "Waiting Response...";
		$scope.ready = false;
		Dinner.getDish.get({id:$scope.DishID},function(data){
			console.log(data.Ingredients);
			$scope.ActiveDish = data;
			Dinner.setActiveDish(data);
			$scope.status = "";
			$scope.ready = true;
		}, function(data){
			$scope.status = "There was an error";
		});
	}

	$scope.getActive();

	$scope.getprice = function(dish){
		if(!dish){
			return "retrieving data..."
		} else {
			return Dinner.getActivePrice();
		}
	}

  	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}

  	$scope.confirmDish = function(){
  		Dinner.addDishToMenu($scope.DishID);
  		Dinner.removeActive();
  	}

  	$scope.back = function(){
  		Dinner.removeActive();
  	}
  
});