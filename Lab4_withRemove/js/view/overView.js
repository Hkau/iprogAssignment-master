var OverView = function (container,model) {
	model.addObserver(this);
	this.printImages = function(l){
		for(var x = 0; x < l.length; x++){
			$("#menuList").prepend(
				'<div class="col-xs-6 col-md-3"><div class="thumbnail">' +
        		'<img class="picturesize" src=' + l[x].ImageURL + '>' +
         		'<div class="textbox"><h3>'+l[x].Title+'</h3></div></div><div align="right"><h4><span id="Price">'+model.getPrice(l[x].RecipeID)+' SEK</span></h4></div></div>')
		}
	}
	this.update = function(message){
		var dishes = model.getFullMenu();
		if (message=="Oupdate"){
			$("#changeView").empty();
			$("#changeView").prepend('<div class="row"><div id="menuList"></div></div><div class="row"><div class= "col-xs-4"></div><div class= "col-xs-4 text-center"><p><h4><span id= "totalMenuPrice"></span></h4></p><button id="printRecipe" class="btn btn-warning btn-small">Print full menu</button></div></div>');
			this.numberOfGuest = container.find("#numberOfGuests");
			this.totalMenuPrice = container.find("#totalMenuPrice");
			this.numberOfGuest.html(model.getNumberOfGuests());
			this.totalMenuPrice.html(model.getTotalMenuPrice() + " SEK");
			this.printImages(dishes);
			$(".thumbnail").matchHeight();
		}else{
			console.log("OverView no message");
		}
	}

}
