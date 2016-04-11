//ExampleView Object constructor
var DinnerViewControler = function (container,model) {
	$('#minusGuest').click(function(){
		model.setNumberOfGuests(-1);
		model.notifyObservers("changeNumberOfGuests");
	})
	
	$('#plusGuest').click(function(){
		model.setNumberOfGuests(1);
		model.notifyObservers("changeNumberOfGuests");
	})

	$('#confirm').click(function(){
		$("#firstView").hide();
		$("#rightView").hide();
		$("#overView").show();
		model.notifyObservers("Oupdate");
	})

	$(document).on("click","#totalTable tbody > #selectMyDinner",function(x){
 	var id = x.target.val;
 	model.removeDishFromMenu(id);
 	model.notifyObservers("removeDish");
	})
}