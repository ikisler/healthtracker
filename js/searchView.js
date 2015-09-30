var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.SearchView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: 'header',

	// Our template for the line of statistics at the bottom of the app.
	//foodItemTemplate: _.template( $('#food-item-template').html() ),

	events: {
		//'keypress #search': 'searchForMatch' //'createOnEnter'
		'click #search-button': 'searchForMatch'
	},

	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed.
	initialize: function() {
		//this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#search');
		this.$searchResults = this.$('.search-results');
		//this.$footer = this.$('#footer');
		//this.$main = this.$('#main');

		this.listenTo(app.Foods, 'add', this.addOne);
		this.listenTo(app.Foods, 'reset', this.addAll);

		this.listenTo(app.Results, 'add', this.addOneResult);
		this.listenTo(app.Results, 'reset', this.addAllResult);

		app.Foods.fetch();
	},

	// Add a single todo item to the list by creating a view for it, and
	// appending its element to the `<ul>`.
	addOne: function( food ) {
		var view = new app.FoodView({ model: food });
		$('#food-list').append( view.render().el );
		console.log(app.Foods.name());
	},

	// Add all items in the **Todos** collection at once.
	addAll: function() {
		this.$('#food-list').html('');
		app.Foods.each(this.addOne, this);
	},

    exampleFoods: [
			{name: 'pizza',
			calories: 100},
			{name: 'sandwich',
			calories: 200},
			{name: 'salad',
			calories: 300},
			{name: 'cake',
			calories: 400},
			{name: 'spaghetti',
			calories: 500},
			{name: 'garlic bread',
			calories: 600},
			{name: 'lasagna',
			calories: 700},
			{name: 'sack of potatoes',
			calories: 800},
			{name: 'nine pizzas',
			calories: 900},
			{name: 'everything on the menu',
			calories: 1000},
		],

	addOneResult: function( food ) {
		var view = new app.ResultsView({ model: food });
		$('.search-results').append( view.render().el );
		console.log(app.Results.name());
	},

	// Add all items in the **Todos** collection at once.
	addAllResult: function() {
		this.$('.search-results').html('');
		app.Results.each(this.addOne, this);
	},

    searchForMatch: function() {
    	for(var i=0; i<this.exampleFoods.length; i++) {
    		if(this.$input.val().trim() === this.exampleFoods[i].name) {
    			app.Foods.create({name: this.exampleFoods[i].name, calories: this.exampleFoods[i].calories});

    			this.$input.val('');
    		}
    	}

    	var currentItem;
    	for(var i=0; i<this.exampleFoods.length; i++) {
    		// Add search results to .search-results ul
    		//currentItem = new app.ResultsView(this.exampleFoods[i].name); //app.ResultsView({name: this.exampleFoods[i].name, calories: this.exampleFoods[i].calories});
    		//$('.search-results').append( currentItem.render().el );
    		//$('.search-results').append('<li>' + this.exampleFoods[i].name +'</li>')
    		app.Results.create({name: this.exampleFoods[i].name, calories: this.exampleFoods[i].calories});
    	}
    }

});

/*
	newAttributes: function() {
      return {
        name: this.$input.val().trim(),
        order: app.Foods.nextOrder(),
        calories: 0
      };
    },

    createOnEnter: function( event ) {
    	console.log(this.newAttributes() );
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }
      //app.Foods.create({name: 'foodTest02'});//this.newAttributes() );
		app.Foods.create(this.newAttributes() );

      this.$input.val('');
    },
*/