'use strict';

angular.module('app') // the second param of [] is not needed here as we're not creating a new module, merely attaching to app.js

// Services allow you to create a reusable set of functions and values that can be passed across the application.
// Methods inside the service are available to any controller that declares the service as a dependency
.service('dataService', function($http){

  // GET /api/recipes - Gets all of the recipes.
    // creates a 'recipes' method that makes a call to the recipes API
  this.recipes = function(callback){
    $http.get('/api/recipes')
    .then(callback);
  };


  // GET /api/categories - Gets all of the categories.
  this.categories = function(callback){
    $http.get('/api/categories')
    .then(callback);
  };

  // GET /api/fooditems - Gets all of the food items.
  this.fooditems = function(callback){
    $http.get('/api/fooditems')
    .then(callback);
  };

  this.recipesByCategory = function(chosenCategory, callback){
    $http.get('/api/recipes?category='+ chosenCategory.name) // pass in the key value to the api
    .then(callback);
};
  // NOTE This below never worked and could be a total mess.
  // GET /api/recipes/{id} - Gets the recipe for the specified ID.
  this.recipeById = function(id, callback) {
    $http.get('/api/recipes/' + id)
    .then(callback);
  };


  // PUT /api/recipes/{id} - Updates the recipe for the specified ID.
   // I'm imagining that this is responsible for updating a recipe when an ingredient has been added AND when one has been deleted?

  // POST /api/recipes - Adds a recipe.
  this.saveRecipe = function (recipe) {
    console.log("The " + recipe.name + " recipe has been saved!");
    //other logic
  };

  // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
  this.deleteRecipe = function(recipe) {
    console.log(recipe);
    //other logic
  };
});
