//ExampleView Object constructor
var LasagnaViewControler = function (container,model) {
	$('.minusGuest').click(function(){
		model.setNumberOfGuests(-1);
		model.notifyObservers("changeNumberOfGuests");
	})
	
	$('.plusGuest').click(function(){
		model.setNumberOfGuests(1);
		model.notifyObservers("changeNumberOfGuests");
	})

	$('#confirmDishButton').click(function(){
		var id = model.getActiveDish().RecipeID;
		if(!model.checkMenu(id)){
			model.addDishToMenu(id);
			model.notifyObservers("addDishToMenu");
		}
		$("#lasagnaView").hide();
		$("#secondView").show();
		$("#thirdView").show();
	})

	$('#backToSelectDishButton').click(function(){
		$("#lasagnaView").hide();
		$("#secondView").show();
		$("#thirdView").show();
	})
}