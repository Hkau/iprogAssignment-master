//ExampleView Object constructor
var OverViewControler = function (container,model) {

	$('#goBack').click(function(){
		$("#overView").hide();
		$("#firstView").show();
		$("#rightView").show();
	})

	$('#changeView').on("click","#printRecipe", function(){
		console.log("in");
		model.notifyObservers("Pupdate");
	})
}