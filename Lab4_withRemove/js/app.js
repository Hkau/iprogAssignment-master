$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	var dinnerView = new DinnerView($("#firstView"),model);
	var foodsView = new FoodsView($("#rightView"),model);
	var lasagnaView = new LasagnaView($("#rightView"),model);
	var prepView = new PrepView($("#overView"),model);
	var overView = new OverView($("#overView"),model);
	var overViewControler = new OverViewControler($("#overView"),model);
	var dinnerViewControler = new DinnerViewControler(dinnerView,model);
	var dinnerselectControler = new DinnerselectControler(foodsView,model);
	var lasagnaViewControler = new LasagnaViewControler($("#rightView"),model);
});