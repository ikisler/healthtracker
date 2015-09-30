// Results collection

var app = app || {};

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
app.Result = Backbone.Model.extend({
	defaults: {
		name: '',
		calories: 0
	},

});

var ResultsList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: app.Result,

	// Save all of the todo items under the `"todos-backbone"` namespace.
	localStorage: new Backbone.LocalStorage('healthtracker-results-backbone'),

	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Todos are sorted by their original insertion order.
	comparator: function( todo ) {
		return todo.get('order');
	} /*,

	name: function () {
		//return this.where({name: });
		return this.where({name: '*'});	// Figure out how to return everything?
		//return this;
	}
*/
});

// Create our global collection of **Todos**.
app.Results = new ResultsList();