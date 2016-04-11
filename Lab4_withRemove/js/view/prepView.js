var PrepView = function (container,model) {
	model.addObserver(this);
	var cutFigure = 600;
	var Insturuction = "";
	var cutDescription = 100;
	var Description = "";
	this.printImages = function(l){
		for(var x = 0; x < l.length; x++){
			if (l[x].Instructions.length > cutFigure){
				Instruction = l[x].Instructions.substr(0,cutFigure) + "...";
			}else{
				Instruction = l[x].Instructions;
			}
			if (l[x].Description.length > cutDescription){
				Description = l[x].Description.substr(0,cutDescription) + "...";
			}else{
				Description = l[x].Description;
			}
			$("#changeView").prepend(
				'<div class="row"><div class="left"><img src='+ l[x].ImageURL +' class="img-rounded" width="200" height="200"></div>' +
      			' <div class= "left"><h3><b>'+ l[x].Title + '</h3></b></p><p>'+Description+'</p></div>' +
      			' <div class= "right"><h3><b>Preperation</h3></b></p><p>'+Instruction+'</p></div></div>')
		}
	}
	this.update = function(message){
		if (message=="Pupdate"){
		var dishes = model.getFullMenu();
		$("#changeView").empty();
		this.printImages(dishes);
	}else{
		console.log("PrepView has no message");
	}
	}
}
