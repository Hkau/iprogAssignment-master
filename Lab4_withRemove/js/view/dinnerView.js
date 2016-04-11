//ExampleView Object constructor
var DinnerView = function (container,model) {
	// $("#firstView").prepend('<h3>My Dinner</h3><div>Number of guests: <span id="numberOfGuests"></span></div><div align="right"><button id="plusGuest" class="btn"><span class="glyphicon glyphicon-plus"></span></button><button id="minusGuest" class="btn"><span class="glyphicon glyphicon-minus"></span></button></div><br><div><table id="totalTable" class="table table-hover" style="width:100%"><thead><tr><td>Dish Name</td> <td>Cost</td></tr></thead><tbody><tr></tr></tbody></table><HR><div align="right"><span id="totalPrice"></span></div><br><div align="center"><button id="confirm" type="button" class="btn btn-primary">Confirm Dinner</button></div></div>');
	$("#firstView").show();

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	model.addObserver(this);
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.totalPrice = container.find("#totalPrice");

	var menu = model.getFullMenu();

	this.numberOfGuests.html(model.getNumberOfGuests());
	for (x in menu){
		$('#totalTable tbody > tr:last').after('<tr id="selectMyDinner" val="'+menu[x].RecipeID+'"><td>' + menu[x].Title + '</td><td>' + model.getPrice(menu[x].RecipeID) + '</td></tr>')
	}
	this.totalPrice.html(model.getTotalMenuPrice()+" SEK ");

	// $("#confirm").click(function(){
	// 	$("#firstView").hide();
	// 	var overView = new OverView("#oneView",model);
	// 	var overViewControler = new OverViewControler("#oneView",model);
	// })

	this.update = function(message){	
		var tP = document.getElementById("totalPrice");
		var tG = document.getElementById("numberOfGuests");
		var menu = model.getFullMenu();

		if (message == "addDishToMenu") {
			// this.numberOfGuests.html(model.getNumberOfGuests());
			// $("#totalTable tbody").empty();
			// for (x in menu){
			// 	if (x == 0) {$("#totalTable tbody").prepend('<tr id="selectMyDinner" val="'+menu[x].id+'"><td>' + menu[x].name + '</td><td>' + model.getPrice(menu[x].id) + '</td></tr>');
			// }else{
			// 		$('#totalTable tbody > tr:last').after('<tr id="selectMyDinner" val="'+menu[x].id+'"><td>' + menu[x].name + '</td><td>' + model.getPrice(menu[x].id) + '</td></tr>');
			// 	}
			// 	}
			// this.totalPrice.html(model.getTotalMenuPrice()+" SEK ");
			var activeDish = model.getActiveDish();
	
			var tr = document.createElement("tr");
			tr.id = "selectMyDinner";
			tr.val = activeDish.RecipeID;

	 		var td = document.createElement("td");
	 		var tdtext = document.createTextNode(activeDish.Title);
	 		td.appendChild(tdtext);
	 		td.val = activeDish.RecipeID;
	 		tr.appendChild(td);
	 		
	 		var td1 = document.createElement("td");
	 		var tdtext1 = document.createTextNode(model.getPrice(activeDish.RecipeID));
	 		td1.appendChild(tdtext1);
	 		td1.val = activeDish.RecipeID;
	 		tr.appendChild(td1);

	 		document.getElementById("totalTable").tBodies.item(0).appendChild(tr);
	 		tP.innerHTML = model.getTotalMenuPrice()+" SEK ";

		} else if(message=="changeNumberOfGuests"){
			tG.innerHTML = model.getNumberOfGuests();
			var currentTable = document.getElementById("totalTable");
			if (currentTable.hasChildNodes()){
  				var children = currentTable.childNodes[1].childNodes;
   				for (var i = 1; i < children.length; i++){
   					var id = children[i].val;
					children[i].lastChild.innerHTML = model.getPrice(id);
				}
				tP.innerHTML = model.getTotalMenuPrice()+" SEK ";
			}
		} else if(message=="removeDish"){
			var id = model.getremovedID();
			var currentTable = document.getElementById("totalTable");
			if (currentTable.hasChildNodes()){
				var parent = currentTable.childNodes[1];
  				var children = currentTable.childNodes[1].childNodes;
   				for (var i = 1; i < children.length; i++){
   					if (id == children[i].val) {
   						parent.removeChild(children[i]);
   						break;
   					}
				}
				tP.innerHTML = model.getTotalMenuPrice()+" SEK ";
			}
		// } else if(message=="rewrite"){
		// 	$("#firstView").prepend('<h3>My Dinner</h3><div>Number of guests: <span id="numberOfGuests"></span></div><div align="right"><button id="plusGuest" class="btn"><span class="glyphicon glyphicon-plus"></span></button><button id="minusGuest" class="btn"><span class="glyphicon glyphicon-minus"></span></button></div><br><div><table id="totalTable" class="table table-hover" style="width:100%"><thead><tr><td>Dish Name</td> <td>Cost</td></tr></thead><tbody><tr></tr></tbody></table><HR><div align="right"><span id="totalPrice"></span></div><br><div align="center"><button id="confirm" type="button" class="btn btn-primary">Confirm Dinner</button></div></div>');
		// 	tG = 
		// 	for (x in menu){
		// 		$('#totalTable tbody > tr:last').after('<tr id="selectMyDinner" val="'+menu[x].id+'"><td>' + menu[x].name + '</td><td>' + model.getPrice(menu[x].id) + '</td></tr>')
		// 	}
		// 	tP = 
	this.totalPrice.html(model.getTotalMenuPrice()+" SEK ");
		} else {
			console.log("SelectView no message");
		}
	}
}