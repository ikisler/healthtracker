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
	},

	resetList: function() {
		console.log(app.Foods.name());
		//app.Foods.reset();
		_.invoke(app.Foods.name(), 'destroy');
		//app.Foods.invoke('destroy');
     	return false;
//		app.Foods.reset();
//		return false;
	}

});