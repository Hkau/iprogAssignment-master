//ExampleView Object constructor
var FoodsView = function (container,model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	// $("#rightView").empty();
  	// $("#rightView").prepend('<div id="secondView" class="float2"></div><div id="thirdView"></div>');
	// $("#secondView").prepend('<div id="nextView" class="float2"><h4>&nbsp;SELECT DISH</h4><HR><div class="row"><div class="col-lg-5"><div class="input-group">'+
  								 // '<input id="searchWord" type="text" class="form-control" placeholder="Search for..."><span class="input-group-btn"><button id="search" class="btn btn-default" type="button">Search</button></span></div></div><div class="col-lg-5"><select id="selecter" class="form-control"><option>main dish</option><option>starter</option><option>dessert</option></select></div></div></div>')
	model.addObserver(this);
	this.thirdView = container.find("#thirdView");
	this.selectFilter = container.find("#selectFilter");
	this.selectDishButton = container.find(".selectDishButton");
	this.numberofGuests = container.find(".numberofGuests");
	this.totalMenuPrice = container.find(".totalMenuPrice");
	this.selectDishButton = container.find(".selectDishButton");

	this.numberofGuests.html(model.getNumberOfGuests());

	this.printImages = function(dishList){
		var row = document.createElement("div");
		row.className = "row fl";	

		for(var i =0; i<dishList.length;i++){	

			col = document.createElement("div");
			col.className = "col-sm-2 col-md-2 matchHeight";	

			image = document.createElement("img");
			image.src = dishList[i].ImageURL;
			image.className = "img-rounded";
			image.width = "150";
			image.height = "150";
				

			title = document.createElement("h4");
			titletext = document.createTextNode(dishList[i].Title);
			title.appendChild(titletext);	

			description = document.createElement("p");
			descriptiontext = document.createTextNode("...");
			description.appendChild(descriptiontext);	

			button = document.createElement("a");
			button.role = "button";
			button.className = "btn btn-warning btn-small selectDishButton";
			button.value = dishList[i].RecipeID;
			buttontext = document.createTextNode("Select Dish");
			button.appendChild(buttontext);	

			col.appendChild(image);
			col.appendChild(title);
			col.appendChild(description);
			col.appendChild(button);	

			row.appendChild(col);
		}
		$("#thirdView").append(row);
	}
	// this.printImages(this.typedishList);

	this.update = function(message){
		if (typeof(message) != 'string' && !model.getError()){
			$("#Loading").html("Waiting for search...");
			$("#Loading").hide();
			console.log(message);
			this.printImages(message);
			$(".matchHeight").matchHeight();
		}else if (model.getError()){
			$("#Loading").html(message);
		}else {
			console.log("foodsView doesnt have " + message)
		}
	}

}