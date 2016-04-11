//DinnerModel Object constructor
var DinnerModel = function() {

	var menu = [];
	var observers = [];
	var guests = 0;
	var Active = {};
	var removedID = 0;
	var error = false;
	var apiKey = "0OV23011kU7B3VVVgxTTTIfdNXeTI3us";
	var types=["main dish","dessert","appetizer"];

	this.addObserver = function(observer) {
		observers.push(observer);
	}

	this.notifyObservers = function(message) {
		for(var i=0;i<observers.length;i++){
			 observers[i].update(message);	
		}
	}

	function notifyObservers(message) {
		for(var i=0;i<observers.length;i++){
			 observers[i].update(message);	
		}
	}

	this.setNumberOfGuests = function(num) {		
		if (guests + num >= 0){
			guests += num;
		}
	}

	// should return 
	this.getNumberOfGuests = function() {
		return guests;
	}

	this.getremovedID = function(){
		return removedID;
	}

	this.getError = function(){
		return error;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		var ans = [];
		for (x in menu){
			if (menu[x].type == type){
				ans.push(x);
			}
		}
		return ans;
	}

	// this.setActiveDish = function(id){
	// 	Active = this.getDish(id);
	// }

	this.getActiveDish = function(){
		return Active;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return menu;
	}

	this.checkMenu = function(id){
		for(key in menu){
			if(menu[key].RecipeID == id) {
				return menu[key];
			}
		}
		return false;
	}

	//Returns all Ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ans = [];
		for (x in menu){
			ans = ans.concat(menu[x].Ingredients);
		}
		return ans;
	}

	//Returns the total price of the menu (all the Ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var total = 0;
		var ingre = this.getAllIngredients();
		for (x in ingre){
			total += Math.round(ingre[x].MetricQuantity * guests);
		}
		return total;
	}

	this.getPrice = function(id) {
		var total = 0;
		var ingre = this.checkMenu(id).Ingredients;
		for (x in ingre){
			total += Math.round(ingre[x].MetricQuantity * guests);
		}
		return total;
	}

	this.getActivePrice = function() {
		var total = 0;
		var ingre = Active.Ingredients;
		for (x in ingre){
			total += Math.round(ingre[x].MetricQuantity * guests);
		}
		return total;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		this.removeDishFromMenu(id);
		menu.push(Active);
		menu = $.grep(menu, function(e){return e !== undefined;});
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		removedID = id;
		for (x in menu){
			if (menu[x].RecipeID == id){
				delete menu[x];
			}
		}
		console.log(menu);
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	// this.getAllDishes = function (type,filter) {
	//   return $(dishes).filter(function(index,dish) {
	// 	var found = true;
	// 	if(filter){
	// 		found = false;
	// 		$.each(dish.Ingredients,function(index,ingredient) {
	// 			if(ingredient.name.indexOf(filter)!=-1) {
	// 				found = true;
	// 			}
	// 		});
	// 		if(dish.name.indexOf(filter) != -1)
	// 		{
	// 			found = true;
	// 		}
	// 	}
	//   	return dish.type == type && found;
	//   });	
	// }

	//function that returns a dish of specific ID
	this.getDish = function (id) {
		var url = "http://api.bigoven.com/recipe/"+ id + "?api_key=" + apiKey; 
			$.ajax({
		         type: "GET",
        		 dataType: 'json',
        		 cache: false,
     		     url: url,
		     	success: function(data){
					Active = data;
					console.log(data);
					notifyObservers("Lupdate");
					// return data;
				}, 
				error: function(data){
					console.log(data);
				}
         })
	}

	this.getAllDishes = function(type,titleKeyword){
		var re = "";
		var url = "http://api.bigoven.com/recipes?pg=12&rpp=10&any_kw=" + type + "&api_key="+apiKey;
		if (titleKeyword) url = "http://api.bigoven.com/recipes?pg=12&rpp=10&title_kw=" + titleKeyword+"&any_kw="+type + "&api_key="+apiKey;
			$.ajax({
		         type: "GET",
        		 dataType: 'json',
        		 cache: false,
     		     url: url,
   		         success: function (data) {
   		         	error = false;
   		         	console.log(data);
   		         	notifyObservers(data.Results);
        		 },
        		 error: function(data) {
        		 	error = true;
        		 	console.log(data);
        		 	notifyObservers(data.statusText);
        		 }
         });
	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of Ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	// var dishes = [{
	// 	'id':1,
	// 	'name':'French toast',
	// 	'type':'starter',
	// 	'image':'toast.jpg',
	// 	'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
	// 	'Ingredients':[{ 
	// 		'name':'eggs',
	// 		'quantity':0.5,
	// 		'unit':'',
	// 		'price':10
	// 		},{
	// 		'name':'milk',
	// 		'quantity':30,
	// 		'unit':'ml',
	// 		'price':6
	// 		},{
	// 		'name':'brown sugar',
	// 		'quantity':7,
	// 		'unit':'g',
	// 		'price':1
	// 		},{
	// 		'name':'ground nutmeg',
	// 		'quantity':0.5,
	// 		'unit':'g',
	// 		'price':12
	// 		},{
	// 		'name':'white bread',
	// 		'quantity':2,
	// 		'unit':'slices',
	// 		'price':2
	// 		}]
	// 	},{
	// 	'id':2,
	// 	'name':'Sourdough Starter',
	// 	'type':'starter',
	// 	'image':'sourdough.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'active dry yeast',
	// 		'quantity':0.5,
	// 		'unit':'g',
	// 		'price':4
	// 		},{
	// 		'name':'warm water',
	// 		'quantity':30,
	// 		'unit':'ml',
	// 		'price':0
	// 		},{
	// 		'name':'all-purpose flour',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':2
	// 		}]
	// 	},{
	// 	'id':3,
	// 	'name':'Baked Brie with Peaches',
	// 	'type':'starter',
	// 	'image':'bakedbrie.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'round Brie cheese',
	// 		'quantity':10,
	// 		'unit':'g',
	// 		'price':8
	// 		},{
	// 		'name':'raspberry preserves',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':10
	// 		},{
	// 		'name':'peaches',
	// 		'quantity':1,
	// 		'unit':'',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':100,
	// 	'name':'Meat balls',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
	// 	'Ingredients':[{ 
	// 		'name':'extra lean ground beef',
	// 		'quantity':115,
	// 		'unit':'g',
	// 		'price':20
	// 		},{
	// 		'name':'sea salt',
	// 		'quantity':0.7,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'small onion, diced',
	// 		'quantity':0.25,
	// 		'unit':'',
	// 		'price':2
	// 		},{
	// 		'name':'garlic salt',
	// 		'quantity':0.7,
	// 		'unit':'g',
	// 		'price':2
	// 		},{
	// 		'name':'Italian seasoning',
	// 		'quantity':0.6,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'dried oregano',
	// 		'quantity':0.3,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'crushed red pepper flakes',
	// 		'quantity':0.6,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'Worcestershire sauce',
	// 		'quantity':6,
	// 		'unit':'ml',
	// 		'price':7
	// 		},{
	// 		'name':'milk',
	// 		'quantity':20,
	// 		'unit':'ml',
	// 		'price':4
	// 		},{
	// 		'name':'grated Parmesan cheese',
	// 		'quantity':5,
	// 		'unit':'g',
	// 		'price':8
	// 		},{
	// 		'name':'seasoned bread crumbs',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':101,
	// 	'name':'MD 2',
	// 	'type':'main dish',
	// 	'image':'bakedbrie.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':1,
	// 		'unit':'pieces',
	// 		'price':8
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':10,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':102,
	// 	'name':'MD 3',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':2,
	// 		'unit':'pieces',
	// 		'price':8
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':10,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':5,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':102,
	// 	'name':'MD 4',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':1,
	// 		'unit':'pieces',
	// 		'price':4
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':12,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':6,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':200,
	// 	'name':'Chocolat Ice cream',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	},{
	// 	'id':201,
	// 	'name':'Vanilla Ice cream',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	},{
	// 	'id':202,
	// 	'name':'Strawberry',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'Ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	}
	// ];
}