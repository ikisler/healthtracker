/*****
"Calorie Tracker" by Isabeau Kisler
Application allows user to create a list of food items, tracking total calories.

Project created for Udacity's Front-End Nano-Degree using
Backbone.js, jQuery, and Nutritionix API.

10/15
*****/

var app = app || {};

$(function() {

	// Kick things off by creating the views.
	new app.FooterView();
	new app.SearchView();

});