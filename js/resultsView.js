var app = app || {};

// Results Item View
// --------------

// The DOM element for a result item
app.ResultsView = Backbone.View.extend({
	tagName: 'li',

	// Get the template for a single item
	template: _.template( $('#result-item-template').html() ),

	// When it's clicked, run the deleteResultItem function
	events: {
		'click': 'deleteResultItem'
	},

	// Listen for changes in the model to trigger rerendering or removal
	initialize: function() {
		this.$input = this.$('#search');

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'destroy', this.addOne);
	},

	// Re-renders the titles of the Results item.
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );

		return this;
	},

	// Delete the result item
	deleteResultItem: function() {
		this.model.destroy();
	},

	// Add the result item to the food list by creating a new Food item.
	addOne: function(food) {
		app.Foods.create({name: food.attributes.name, calories: food.attributes.calories});

		this.$input.val('');

		// Reset the results collection
		app.Results.reset();
	}
});