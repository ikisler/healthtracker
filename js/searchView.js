var app = app || {};

// SearchView
// ---------------

// The view that controls the Search function at the top
app.SearchView = Backbone.View.extend({

	el: 'form',

	// When the search button is clicked, it triggers the searchForMatch function
	events: {
		'click #search-button': 'searchForMatch'
	},

	// Set up references, listen to changes in Foods and Results
	initialize: function() {
		that = this;

		this.$input = this.$('#search');
		this.$searchResults = this.$('.search-results');

		this.listenTo(app.Foods, 'add', this.addOne);
		this.listenTo(app.Foods, 'reset', this.addAll);

		this.listenTo(app.Results, 'add', this.addOneResult);
		this.listenTo(app.Results, 'reset', this.addAllResult);

		app.Foods.fetch();
	},

	// Add a single Food item to the list
	addOne: function( food ) {
		var view = new app.FoodView({ model: food });
		$('#food-list').append( view.render().el );
	},

	// Add all items in the Foods collection at once.
	addAll: function() {
		this.$('#food-list').html('');
		app.Foods.each(this.addOne, this);
	},

	// Add a Result item to the list
	addOneResult: function( food ) {
		var view = new app.ResultsView({ model: food });
		$('.search-results').append( view.render().el );
	},

	// Add all items in the Results collection at once.
	addAllResult: function() {
		this.$('.search-results').html('');
		app.Results.each(this.addOne, this);
	},

	// Call the Nutritionix API, search for an item, and display results
	searchForMatch: function() {
		// Prevent the form from trying to submit and redirect to a different page
		event.preventDefault();

		// Get the user query and set it up for the API
		var foodQuery = this.$input.val().trim();
		var query = 'https://api.nutritionix.com/v1_1/search/' + foodQuery + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=cef4e263&appKey=e473f453db5ce19ee663ea7ef5cf953d';

		// Reset the Results collection
		app.Results.reset();

		// Put up a loading message
		this.$searchResults.text('Loading...');

		$.ajax({url: query,
			dataType:'json',
			success: function(data) {
				that.$searchResults.text('');

				var results = data.hits;
				var resultsLength = results.length;

				// If there are no results, display an appropriate message and leave the function
				if(resultsLength === 0) {
					that.$searchResults.text('No results');
					return false;
				}
				
				// Loop through the results and create a Results item for each
				for(var i=0; i<resultsLength; i++) {
					app.Results.create({brandname: results[i].fields.brand_name, name: results[i].fields.item_name, calories: results[i].fields.nf_calories});
				}
			}
		}).error(function(){
			// If something goes wrong, display a message
			that.$searchResults.text('Connection failed.');
		});

		// Reset the input box
		this.$input.val('');
	}

});