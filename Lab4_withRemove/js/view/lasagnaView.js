var LasagnaView = function(container,model){
	model.addObserver(this);
	
	this.numberofGuests = container.find("#numberofGuests");
	this.IngredientsList = container.find("#ThelistofIngredients");
	this.confirmDishButton = container.find("#confirmDishButton");
	this.dishName = container.find("#DishName");
	this.dishDescription = container.find("#DishDescription");
	this.dishInstruction = container.find("#DishInstruction")

	this.printIngredients = function(dish){
		var ingList = '<table class="table"><thead><tr><th>Name</th><th>quantity</th><th>price</th></tr></thead><tbody>';
		var guests = model.getNumberOfGuests();

		this.numberofGuests.html(guests);

		for(var i =0; i<dish.Ingredients.length;i++){
				str = "<tr>"
				+ "<td>" + dish.Ingredients[i].Name + " " +"</td>"
				+ "<td>" + guests * dish.Ingredients[i].MetricQuantity + " " + dish.Ingredients[i].MetricUnit + " " +"</td>"
				+ "<td id='price'>" + Math.round(guests * dish.Ingredients[i].MetricQuantity) + " SEK " +"</td>"
				+ "</tr>";
				ingList = ingList + str; 
			}
			totPrice = model.getActivePrice(dish.id);
			ingList = ingList + "</tbody></table>" + " <div id='totalprice' align='right'><h4>Total " + totPrice + " SEK</h4></div>";
			
			this.IngredientsList.html(ingList);
	}



	this.update = function(message){
		var newDish = model.getActiveDish();

		if(message=="changeNumberOfGuests"){
			this.printIngredients(newDish);
		}else if(message=="Lupdate"){
			this.dishName.html(newDish.Title);
			document.getElementById("DishImage").src = newDish.ImageURL;
			this.dishInstruction.html(newDish.Instructions);
			this.dishDescription.html(newDish.Description);
			this.printIngredients(newDish);
		}else{
			console.log("LasagnaView no message");
		}
	}
}