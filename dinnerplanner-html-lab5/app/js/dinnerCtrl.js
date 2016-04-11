// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.guests = Dinner.getNumberOfGuests();
  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.fullMenu = Dinner.getFullMenu();

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getprice = function(id){
  	return Dinner.getPrice(id);
  }

  $scope.totalCost = function(){
    return Dinner.getTotalMenuPrice();
  }

  $scope.removeDish = function(id){
    return Dinner.removeDishFromMenu(id);
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});