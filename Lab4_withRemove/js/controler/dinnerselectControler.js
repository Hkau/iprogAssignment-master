var DinnerselectControler = function (view,model) {
	var selectedObject = [];

	$('#search').click(function(){
		var searchWord = $('#searchWord').val();
		var selectVal = $("#selecter option:selected").text();
		selectedObject = model.getAllDishes(selectVal,searchWord);
		$("#Loading").html("Loading...");
		$("#Loading").show();
		$("#thirdView").empty();
	})
	
	$('#selecter').click(function(){
		var searchWord = $('#searchWord').val();
		var selectVal = $("#selecter option:selected").text();
		if (searchWord){
			selectedObject = model.getAllDishes(selectVal,searchWord);
		}else{
			selectedObject = model.getAllDishes(selectVal,false);
		}
		$("#Loading").html("Loading...");
		$("#Loading").show();
		$("#thirdView").empty();
	})

  	$(document).on("click",".selectDishButton",function(x){
 	var id = x.target.value;
	model.getDish(id);
	$("#secondView").hide();
	$("#thirdView").hide();
	$("#lasagnaView").show();
	})
}