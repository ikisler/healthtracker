var app = app || {};

// Food Item View
// --------------

// The DOM element for a result item...
app.ResultsView = Backbone.View.extend({

	//... is a list tag.
	tagName: 'li',

	// Cache the template function for a single item.
	template: _.template( $('#result-item-template').html() ),

	// The DOM events specific to an item.
	events: {
		'click': 'deleteResultItem'
	},

	// The TodoView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correspondence between a **Todo** and a **TodoView** in this
	// app, we set a direct reference on the model for convenience.
	initialize: function() {
		this.$input = this.$('#search');

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'destroy', this.addOne);
	},

	// Re-renders the titles of the todo item.
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );

		return this;
	},

	deleteResultItem: function() {
		this.model.destroy();
	},

	addOne: function(food) {
		//var view = new app.FoodView({ model: food });
		//$('#food-list').append( view.render().el );

		app.Foods.create({name: food.attributes.name, calories: food.attributes.calories});

		this.$input.val('');

		//_.invoke(app.Results.name(), 'destroy');
		app.Results.reset();
		//console.log(app.Foods.name());
	}
});