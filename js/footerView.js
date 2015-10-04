var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.FooterView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#table-footer',

	// Our template for the line of statistics at the bottom of the app.
	//foodItemTemplate: _.template( $('#food-item-template').html() ),

	events: {
		'click #reset-button': 'resetList'
	},

	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed.
	initialize: function() {
		//this.allCheckbox = this.$('#toggle-all')[0];
		//this.$input = this.$('#search');
		//this.$footer = this.$('#footer');
		//this.$main = this.$('#main');

		//this.listenTo(app.Foods, 'add', this.addOne);
		//this.listenTo(app.Foods, 'reset', this.addAll);

		//app.Foods.fetch();
		this.$totalCalories = $('.calorie-total');

		this.listenTo(app.Foods, 'all', this.total);
	},

	resetList: function() {
		
		app.Foods.reset();

		localStorage.clear();

		//console.log(app.Foods.models);

		//_.invoke(app.Foods.models, 'destroy');
		//app.Foods.invoke('destroy');
     	return false;
//		app.Foods.reset();
//		return false;
	},

	total: function() {
		var FoodsLength = app.Foods.length;
		var totalCalories = 0;
		for(var i=0; i<FoodsLength; i++) {
			totalCalories = totalCalories + app.Foods.models[i].attributes.calories;
		}
		this.$totalCalories.text(totalCalories.toFixed(2));
	}

});