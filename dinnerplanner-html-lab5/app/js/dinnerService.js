// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  

  var menu = [];              //contains all data of menu
  var dishes = [];
  var currentRecipes = [];    //this one holds only IDs of menu
  var guests = 0;
  var Active = {};
  var removedID = 0;
  var error = false;
  var apiKey = "sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox";
 
  this.getDish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey});

  var menu = [];
  if($cookieStore.get("fullMenu")){
    currentRecipes = $cookieStore.get("fullMenu");
    for(ids in currentRecipes){
      this.getDish.get({id:currentRecipes[ids]}, function(data){
        menu.push(data);
      });
    }
  }
  if($cookieStore.get("guests")){
    guests = $cookieStore.get("guests");
  }

  this.setNumberOfGuests = function(num) {    
    if (guests + num >= 0){
      guests += num;
      $cookieStore.put("guests",guests);
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

  this.setActiveDish = function(data){
   Active = data;
  }

  this.getActiveDish = function(){
    return Active;
  }

  this.removeActive = function(){
   Active = {};
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
  
    if(menu.length == 0){
      menu.push(Active);
    } else {
      for(ids in menu){
        if(menu[ids].RecipeID == id){
          alert(menu[ids].Title +" is already in the menu!");
          return 0;
        }
      }
      menu.push(Active);
      console.log(menu);
    }
     
    currentRecipes = [];
    for(dish in menu){
      currentRecipes.push(menu[dish].RecipeID);
    }
    $cookieStore.put("fullMenu", currentRecipes);
    console.log(currentRecipes);
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    console.log(currentRecipes);
    console.log(menu);
    for(recipeID in currentRecipes){
      if(currentRecipes[recipeID] == id){
        currentRecipes.splice(recipeID, 1);
        break;
      }
    }
    for(ID in menu){
      if(menu[ID].RecipeID == id){
        menu.splice(ID, 1);
        break;
      }
    }
    $cookieStore.put("fullMenu", currentRecipes);
  }
  
  //function that returns a dish of specific ID
  // this.getDish = function (id) {
  //   var url = "http://api.bigoven.com/recipe/"+ id + "?api_key=" + apiKey; 
  //     $.ajax({
  //            type: "GET",
  //            dataType: 'json',
  //            cache: false,
  //            url: url,
  //         success: function(data){
  //         Active = data;
  //         console.log(data);
  //         notifyObservers("Lupdate");
  //         // return data;
  //       }, 
  //       error: function(data){
  //         console.log(data);
  //       }
  //        })
  // }

  // this.getAllDishes = function(type,titleKeyword){
  //   var re = "";
  //   var url = "http://api.bigoven.com/recipes?pg=12&rpp=10&any_kw=" + type + "&api_key="+apiKey;
  //   if (titleKeyword) url = "http://api.bigoven.com/recipes?pg=12&rpp=10&title_kw=" + titleKeyword+"&any_kw="+type + "&api_key="+apiKey;
  //     $.ajax({
  //            type: "GET",
  //            dataType: 'json',
  //            cache: false,
  //            url: url,
  //              success: function (data) {
  //               error = false;
  //               console.log(data);
  //               notifyObservers(data.Results);
  //            },
  //            error: function(data) {
  //             error = true;
  //             console.log(data);
  //             notifyObservers(data.statusText);
  //            }
  //        });
  // }

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});